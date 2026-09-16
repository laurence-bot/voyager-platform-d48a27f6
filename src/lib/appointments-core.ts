/**
 * Logique métier PURE des rendez-vous (aucun accès réseau / base).
 * Testée unitairement dans appointments-core.test.ts
 */

export type LinkedKind = "demande" | "cotation" | "dossier";

export type ProjectCandidate = {
  kind: LinkedKind;
  id: string;
  agence_id: string | null;
  email: string | null;
  phone: string | null;
  label: string;
  reference: string | null;
  status: string | null;
  matched_on: "email" | "phone";
  created_at: string | null;
};

export type MatchDecision =
  | { action: "link"; candidate: ProjectCandidate }
  | { action: "needs_project_choice"; candidates: ProjectCandidate[] }
  | { action: "create_demande" };

/** Normalisation email : trim + minuscules. */
export function normalizeEmail(value: unknown): string {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

/**
 * Normalisation téléphone : ne conserve que les chiffres, convertit un
 * préfixe international français en numéro national (0X XX...).
 */
export function normalizePhone(value: unknown): string {
  if (typeof value !== "string") return "";
  let digits = value.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) digits = "00" + digits.slice(1);
  digits = digits.replace(/\D/g, "");
  if (digits.startsWith("0033")) digits = "0" + digits.slice(4);
  else if (digits.startsWith("33") && digits.length === 11) digits = "0" + digits.slice(2);
  return digits;
}

/** Deux numéros correspondent si leurs 9 derniers chiffres significatifs sont identiques. */
export function phoneMatches(a: unknown, b: unknown): boolean {
  const na = normalizePhone(a);
  const nb = normalizePhone(b);
  if (na.length < 9 || nb.length < 9) return false;
  return na.slice(-9) === nb.slice(-9);
}

const INACTIVE_STATUSES = new Set([
  "annule",
  "annulee",
  "annulé",
  "annulée",
  "perdu",
  "perdue",
  "refuse",
  "refusee",
  "refusé",
  "refusée",
  "archive",
  "archivee",
  "archivé",
  "archivée",
  "clos",
  "close",
  "cloture",
  "clôturé",
  "termine",
  "terminee",
  "terminé",
  "terminée",
  "supprime",
  "supprimé",
]);

function slug(value: string | null): string {
  return (value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

/** Un projet est actif si son statut n'est pas un statut terminal. */
export function isActiveProject(candidate: ProjectCandidate): boolean {
  return !INACTIVE_STATUSES.has(slug(candidate.status));
}

/** Déduplique (kind + id) et privilégie une correspondance email sur téléphone. */
export function dedupeCandidates(candidates: ProjectCandidate[]): ProjectCandidate[] {
  const byKey = new Map<string, ProjectCandidate>();
  for (const candidate of candidates) {
    const key = `${candidate.kind}:${candidate.id}`;
    const existing = byKey.get(key);
    if (!existing || (existing.matched_on === "phone" && candidate.matched_on === "email")) {
      byKey.set(key, candidate);
    }
  }
  return [...byKey.values()];
}

/**
 * Décide du rattachement.
 * - correspondances email prioritaires sur les correspondances téléphone
 * - 1 projet actif -> rattachement automatique, aucune demande créée
 * - plusieurs projets actifs -> choix obligatoire, aucun choix arbitraire
 * - aucun projet -> création d'une demande « Rendez-vous »
 */
export function decideAttachment(rawCandidates: ProjectCandidate[]): MatchDecision {
  const active = dedupeCandidates(rawCandidates).filter(isActiveProject);
  if (active.length === 0) return { action: "create_demande" };

  const byEmail = active.filter((c) => c.matched_on === "email");
  const pool = byEmail.length > 0 ? byEmail : active;

  if (pool.length === 1) return { action: "link", candidate: pool[0] };
  return { action: "needs_project_choice", candidates: pool };
}

/** Vérifie qu'un choix de projet renvoyé par le formulaire fait bien partie des candidats. */
export function resolveChosenCandidate(
  candidates: ProjectCandidate[],
  chosen: { kind?: unknown; id?: unknown } | null | undefined,
): ProjectCandidate | null {
  if (!chosen || typeof chosen.id !== "string" || typeof chosen.kind !== "string") return null;
  return (
    candidates.find((c) => c.kind === chosen.kind && c.id === chosen.id) ?? null
  );
}
