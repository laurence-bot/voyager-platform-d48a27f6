import { createFileRoute } from "@tanstack/react-router";

import {
  decideAttachment,
  normalizeEmail,
  normalizePhone,
  resolveChosenCandidate,
  type ProjectCandidate,
} from "@/lib/appointments-core";
import {
  DEFAULT_AGENCE_ID,
  findProjectCandidates,
  getAdminClient,
  logAudit,
} from "@/lib/appointments.server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_MAX = 8;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const stamps = (rateLimitMap.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (stamps.length >= RATE_LIMIT_MAX) return true;
  stamps.push(now);
  rateLimitMap.set(ip, stamps);
  return false;
}

/** Vue publique d'un candidat : aucune donnée personnelle d'un autre client. */
function publicCandidate(candidate: ProjectCandidate) {
  return {
    kind: candidate.kind,
    id: candidate.id,
    label: candidate.label,
    reference: candidate.reference,
    status: candidate.status,
    created_at: candidate.created_at,
  };
}

export const Route = createFileRoute("/api/public/appointments")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
          if (isRateLimited(ip)) {
            return Response.json(
              { error: "Trop de demandes. Réessayez dans quelques minutes." },
              { status: 429 },
            );
          }

          const body = (await request.json()) as Record<string, unknown>;
          if (body["website"]) return Response.json({ status: "ok" }, { status: 200 });

          const fullName = typeof body["nom"] === "string" ? body["nom"].trim() : "";
          const email = normalizeEmail(body["email"]);
          const phoneRaw = typeof body["telephone"] === "string" ? body["telephone"].trim() : "";
          const bookingId = typeof body["booking_id"] === "string" ? body["booking_id"] : "";
          const appointmentDate =
            typeof body["appointment_date"] === "string" ? body["appointment_date"] : "";
          const appointmentSlot =
            typeof body["appointment_slot"] === "string" ? body["appointment_slot"] : "";
          const contactMode =
            typeof body["contact_mode"] === "string" ? body["contact_mode"] : "telephone";
          const subject = typeof body["subject"] === "string" ? body["subject"].trim() : null;
          const message = typeof body["message"] === "string" ? body["message"].trim() : null;
          const destination =
            typeof body["destination"] === "string" && body["destination"].trim()
              ? body["destination"].trim()
              : "Rendez-vous";
          const agenceId =
            typeof body["agence_id"] === "string" && body["agence_id"].trim()
              ? body["agence_id"].trim()
              : DEFAULT_AGENCE_ID;

          if (fullName.length < 2) {
            return Response.json({ error: "Le nom est requis." }, { status: 400 });
          }
          if (!EMAIL_REGEX.test(email)) {
            return Response.json({ error: "Une adresse email valide est requise." }, { status: 400 });
          }
          if (!appointmentDate || !appointmentSlot) {
            return Response.json({ error: "Date et créneau requis." }, { status: 400 });
          }
          if (!bookingId) {
            return Response.json({ error: "Identifiant de réservation manquant." }, { status: 400 });
          }

          const supabase = getAdminClient();

          // --- Idempotence : une soumission = un rendez-vous ------------------
          const { data: existing } = await supabase
            .from("appointments")
            .select("id, linked_type, linked_id, demande_id, status")
            .eq("booking_id", bookingId)
            .maybeSingle();

          const candidates = await findProjectCandidates(supabase, {
            agenceId,
            email,
            phone: phoneRaw,
          });

          // Choix explicite du projet par le client (2e appel)
          const chosen = resolveChosenCandidate(
            candidates,
            (body["project"] as { kind?: unknown; id?: unknown } | undefined) ?? null,
          );

          const decision = chosen
            ? ({ action: "link", candidate: chosen } as const)
            : decideAttachment(candidates);

          // Rendez-vous déjà enregistré : on ne le duplique jamais.
          let appointmentId = existing?.id as string | undefined;

          if (!appointmentId) {
            const { data: inserted, error: insertError } = await supabase
              .from("appointments")
              .insert({
                full_name: fullName,
                email,
                phone: normalizePhone(phoneRaw) || null,
                destination,
                appointment_date: appointmentDate,
                appointment_slot: appointmentSlot,
                contact_mode: contactMode,
                subject,
                message,
                status: decision.action === "needs_project_choice" ? "a_rattacher" : "nouveau",
                agence_id: agenceId,
                booking_id: bookingId,
                source_type: "rendez_vous",
              })
              .select("id")
              .single();

            if (insertError || !inserted) {
              console.error("appointments insert error:", insertError);
              return Response.json(
                { error: "Erreur lors de l'enregistrement du rendez-vous." },
                { status: 500 },
              );
            }
            appointmentId = inserted.id as string;
            await logAudit(supabase, {
              appointmentId,
              action: "created",
              details: { booking_id: bookingId, candidates: candidates.length },
            });
          }

          // --- Plusieurs projets : aucun choix arbitraire ---------------------
          if (decision.action === "needs_project_choice") {
            await supabase
              .from("appointments")
              .update({ status: "a_rattacher", updated_at: new Date().toISOString() })
              .eq("id", appointmentId);
            return Response.json(
              {
                status: "needs_project_choice",
                appointment_id: appointmentId,
                candidates: decision.candidates.map(publicCandidate),
              },
              { status: 200 },
            );
          }

          // --- Un seul projet (ou projet choisi) : rattachement, aucune demande
          if (decision.action === "link") {
            const target = decision.candidate;
            if (
              existing?.linked_type !== target.kind ||
              existing?.linked_id !== target.id
            ) {
              await supabase
                .from("appointments")
                .update({
                  linked_type: target.kind,
                  linked_id: target.id,
                  linked_at: new Date().toISOString(),
                  linked_by: chosen ? "choix_client" : "auto",
                  demande_id: null,
                  status: "nouveau",
                  updated_at: new Date().toISOString(),
                })
                .eq("id", appointmentId);
              await logAudit(supabase, {
                appointmentId,
                action: existing?.linked_id ? "relinked" : "linked",
                linkedType: target.kind,
                linkedId: target.id,
                details: { matched_on: target.matched_on, by: chosen ? "choix_client" : "auto" },
              });
            }
            return Response.json(
              {
                status: "linked",
                appointment_id: appointmentId,
                linked: publicCandidate(target),
              },
              { status: 200 },
            );
          }

          // --- Aucun projet : une seule demande « Rendez-vous » --------------
          if (existing?.demande_id) {
            return Response.json(
              {
                status: "demande_created",
                appointment_id: appointmentId,
                demande_id: existing.demande_id,
              },
              { status: 200 },
            );
          }

          const { data: demande, error: demandeError } = await supabase
            .from("demandes")
            .insert({
              nom_client: fullName,
              email,
              telephone: phoneRaw || null,
              message_client: message,
              destination: "Rendez-vous",
              nombre_pax: 1,
              canal: "site_web",
              agence_id: agenceId,
            })
            .select("id")
            .single();

          if (demandeError || !demande) {
            console.error("demande insert error:", demandeError);
            return Response.json(
              { error: "Erreur lors de l'enregistrement de la demande." },
              { status: 500 },
            );
          }

          await supabase
            .from("appointments")
            .update({
              demande_id: demande.id,
              linked_type: "demande",
              linked_id: demande.id,
              linked_at: new Date().toISOString(),
              linked_by: "auto",
              updated_at: new Date().toISOString(),
            })
            .eq("id", appointmentId);

          await logAudit(supabase, {
            appointmentId,
            action: "demande_created",
            linkedType: "demande",
            linkedId: demande.id as string,
            details: { reason: "aucun projet existant" },
          });

          return Response.json(
            { status: "demande_created", appointment_id: appointmentId, demande_id: demande.id },
            { status: 200 },
          );
        } catch (error) {
          console.error("appointments route error:", error);
          return Response.json({ error: "Erreur serveur." }, { status: 500 });
        }
      },
    },
  },
});
