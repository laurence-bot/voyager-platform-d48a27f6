import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import {
  normalizeEmail,
  normalizePhone,
  phoneMatches,
  type LinkedKind,
  type ProjectCandidate,
} from "./appointments-core";

export const DEFAULT_AGENCE_ID =
  process.env["AGENCE_ID"] || "e1c8fd7a-c645-42de-9625-f6185dd22cd6";

export function getAdminClient(): SupabaseClient {
  return createClient(process.env["SB_URL"]!, process.env["SERVICE_ROLE_KEY"]!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

type TableConfig = {
  table: string;
  kind: LinkedKind;
  labelFields: string[];
  referenceFields: string[];
  statusFields: string[];
};

const SOURCES: TableConfig[] = [
  {
    table: "demandes",
    kind: "demande",
    labelFields: ["destination", "pays_destination", "titre"],
    referenceFields: ["reference", "numero"],
    statusFields: ["statut", "status", "etat"],
  },
  {
    table: "cotations",
    kind: "cotation",
    labelFields: ["titre", "destination", "nom"],
    referenceFields: ["reference", "numero"],
    statusFields: ["statut", "status", "etat"],
  },
  {
    table: "dossiers",
    kind: "dossier",
    labelFields: ["titre", "destination", "nom"],
    referenceFields: ["reference", "numero_dossier", "numero"],
    statusFields: ["statut", "status", "etat"],
  },
];

type Row = Record<string, unknown>;

function pick(row: Row, fields: string[]): string | null {
  for (const field of fields) {
    const value = row[field];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return null;
}

function str(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function toCandidate(
  config: TableConfig,
  row: Row,
  matchedOn: "email" | "phone",
): ProjectCandidate | null {
  const id = str(row["id"]);
  if (!id) return null;
  return {
    kind: config.kind,
    id,
    agence_id: str(row["agence_id"]),
    email: str(row["email"]) ?? str(row["email_client"]),
    phone: str(row["telephone"]) ?? str(row["phone"]) ?? str(row["telephone_client"]),
    label: pick(row, config.labelFields) ?? config.kind,
    reference: pick(row, config.referenceFields),
    status: pick(row, config.statusFields),
    matched_on: matchedOn,
    created_at: str(row["created_at"]),
  };
}

/**
 * Recherche des projets existants du client dans la MÊME agence.
 * Tolérante : une table ou une colonne absente n'interrompt pas la recherche.
 */
export async function findProjectCandidates(
  supabase: SupabaseClient,
  params: { agenceId: string; email: string; phone?: string | null },
): Promise<ProjectCandidate[]> {
  const email = normalizeEmail(params.email);
  const phone = normalizePhone(params.phone);
  const candidates: ProjectCandidate[] = [];

  for (const config of SOURCES) {
    // 1) correspondance email (prioritaire)
    if (email) {
      const { data, error } = await supabase
        .from(config.table)
        .select("*")
        .ilike("email", email)
        .limit(50);
      if (!error && data) {
        for (const row of data as Row[]) {
          const candidate = toCandidate(config, row, "email");
          if (candidate && isSameAgence(candidate, params.agenceId) && !isArchived(row)) {
            candidates.push(candidate);
          }
        }
      }
    }

    // 2) correspondance téléphone (secours) — filtrage applicatif après normalisation
    if (phone.length >= 9) {
      const tail = phone.slice(-9);
      const { data, error } = await supabase
        .from(config.table)
        .select("*")
        .or(`telephone.ilike.%${tail}%,phone.ilike.%${tail}%`)
        .limit(50);
      if (!error && data) {
        for (const row of data as Row[]) {
          const candidate = toCandidate(config, row, "phone");
          if (
            candidate &&
            isSameAgence(candidate, params.agenceId) &&
            !isArchived(row) &&
            phoneMatches(candidate.phone, phone)
          ) {
            candidates.push(candidate);
          }
        }
      }
    }
  }

  return candidates;
}

function isSameAgence(candidate: ProjectCandidate, agenceId: string): boolean {
  // Sécurité : sans agence connue sur la ligne, on ne l'expose pas.
  return candidate.agence_id === agenceId;
}

function isArchived(row: Row): boolean {
  return Boolean(row["archived_at"]) || Boolean(row["deleted_at"]);
}

export async function logAudit(
  supabase: SupabaseClient,
  entry: {
    appointmentId: string;
    action: string;
    linkedType?: string | null;
    linkedId?: string | null;
    actor?: string;
    details?: Record<string, unknown>;
  },
): Promise<void> {
  await supabase.from("appointment_audit_log").insert({
    appointment_id: entry.appointmentId,
    action: entry.action,
    linked_type: entry.linkedType ?? null,
    linked_id: entry.linkedId ?? null,
    actor: entry.actor ?? "site_web",
    details: entry.details ?? {},
  });
}
