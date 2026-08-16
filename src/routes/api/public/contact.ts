import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (rateLimitMap.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (timestamps.length >= RATE_LIMIT_MAX) return true;
  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return false;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Extrait les infos structurées depuis un message au format :
// "Destination : OUGANDA\nVoyageurs : 2\nPériode : Février\nBudget : 8-12k\n..."
function parsePaxValue(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value) && value > 0) {
    return Math.floor(value);
  }

  if (typeof value !== "string") return null;
  const numbers = value.match(/\d+/g);
  if (!numbers?.length) return null;
  const parsed = Number(numbers[numbers.length - 1]);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

function parseBudgetValue(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value) && value > 0) {
    return value;
  }

  if (typeof value !== "string") return null;
  const normalized = value
    .toLowerCase()
    .replace(/(\d)\s+(?=\d)/g, "$1")
    .replace(/€/g, "")
    .replace(/\s+/g, "");
  const matches = [...normalized.matchAll(/(\d+(?:[.,]\d+)?)(k|m)?/g)];
  const values = matches
    .map((match) => {
      const base = Number(match[1].replace(",", "."));
      if (!Number.isFinite(base)) return null;
      if (match[2] === "k") return base * 1000;
      if (match[2] === "m") return base * 1_000_000;
      return base;
    })
    .filter((amount): amount is number => amount !== null && amount > 0);

  return values.length ? Math.max(...values) : null;
}

function extractFromMessage(message: string) {
  const result = {
    destination: null as string | null,
    voyageurs: null as number | null,
    budget: null as number | null,
  };

  if (!message) return result;

  for (const line of message.split("\n")) {
    const match = line.match(/^\s*([^:：]+)\s*[:：]\s*(.+?)\s*$/);
    if (!match) continue;
    const label = match[1].toLowerCase().trim();
    const value = match[2];

    if (label === "destination" && !result.destination) {
      result.destination = value;
    } else if ((label === "voyageurs" || label === "voyageur" || label === "pax") && result.voyageurs === null) {
      result.voyageurs = parsePaxValue(value);
    } else if (label === "budget" && !result.budget) {
      result.budget = parseBudgetValue(value);
    }
  }

  return result;
}

export const Route = createFileRoute("/api/public/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
          if (isRateLimited(ip)) {
            return Response.json(
              {
                error: "Trop de demandes. Réessayez dans quelques minutes.",
              },
              { status: 429 },
            );
          }

          const body = await request.json();

          if (body.website) {
            return Response.json({ success: true }, { status: 200 });
          }

          const nom = typeof body.nom === "string" ? body.nom.trim() : "";
          const email = typeof body.email === "string" ? body.email.trim() : "";
          const message = typeof body.message === "string" ? body.message.trim() : "";

          if (!nom || nom.length < 2) {
            return Response.json({ error: "Le nom est requis." }, { status: 400 });
          }
          if (!email || !EMAIL_REGEX.test(email)) {
            return Response.json({ error: "Une adresse email valide est requise." }, { status: 400 });
          }

          const telephone = typeof body.telephone === "string" && body.telephone.trim() ? body.telephone.trim() : null;

          // 1) Champs structurés si le formulaire les envoie séparément
          let destination: string | null =
            typeof body.destination === "string" && body.destination.trim() ? body.destination.trim() : null;

          let nombrePax: number | null = null;
          const rawPax = body.voyageurs ?? body.pax ?? body.nombre_voyageurs;
          nombrePax = parsePaxValue(rawPax);

          let budget: number | null = parseBudgetValue(body.budget);

          // 2) Fallback : extraction depuis le message
          const parsed = extractFromMessage(message);
          if (!destination && parsed.destination) destination = parsed.destination;
          if (nombrePax === null && parsed.voyageurs) nombrePax = parsed.voyageurs;
          if (!budget && parsed.budget) budget = parsed.budget;

          const supabaseAdmin = createClient(process.env["SB_URL"]!, process.env["SERVICE_ROLE_KEY"]!);

          const basePayload = {
            nom_client: nom,
            email: email,
            telephone: telephone,
            message_client: message || null,
            canal: "site_web",
            agence_id: "e1c8fd7a-c645-42de-9625-f6185dd22cd6",
          };

          // Tentative avec les colonnes structurées
          let { data, error } = await supabaseAdmin
            .from("demandes")
            .insert({
              ...basePayload,
              destination: destination,
              pays_destination: destination,
              nombre_pax: nombrePax ?? 1,
              budget: budget,
            })
            .select("id")
            .single();

          // Info de debug renvoyée dans la réponse (visible dans F12 > Réseau)
          let debugInfo: Record<string, unknown> = { mode: "full" };

          // Sécurité : si une colonne pose problème, on retente sans elles
          // (la demande est toujours enregistrée, comme avant)
          if (error) {
            console.error("Insert avec colonnes échoué, retry minimal:", error);
            debugInfo = {
              mode: "fallback",
              supabase_error: error.message,
              supabase_code: error.code,
              supabase_details: error.details,
              supabase_hint: error.hint,
            };
            ({ data, error } = await supabaseAdmin.from("demandes").insert(basePayload).select("id").single());
          }

          if (error) {
            console.error("Supabase insert error:", error);
            return Response.json({ error: "Erreur lors de l'enregistrement de la demande." }, { status: 500 });
          }

          return Response.json({ success: true, id: data?.id ?? null, debug: debugInfo }, { status: 200 });
        } catch (err) {
          console.error("Contact route error:", err);
          return Response.json({ error: "Erreur serveur." }, { status: 500 });
        }
      },
    },
  },
});
