import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "@tanstack/react-router";

type Profile = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  postal_code: string | null;
  country: string | null;
  birth_date: string | null;
  nationality: string | null;
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
};

type Trip = {
  id: string;
  title: string;
  destination: string;
  start_date: string | null;
  end_date: string | null;
  travelers: number | null;
  status: "devis" | "confirme" | "en_cours" | "termine" | "annule";
  amount: number | null;
  notes: string | null;
};

type Invoice = {
  id: string;
  invoice_number: string;
  amount: number;
  issued_at: string;
  pdf_path: string | null;
  trip_id: string | null;
};

type TripDocument = {
  id: string;
  trip_id: string;
  title: string;
  category: string;
  file_path: string;
  file_name: string;
  created_at: string;
};

type ContactRequest = {
  id: string;
  created_at: string;
  destination: string;
  travelers: string;
  period: string;
  budget: string;
  message: string;
  status: string;
};

const REQUEST_STATUS_META: Record<string, { label: string; cls: string }> = {
  new: { label: "Reçue", cls: "bg-sand text-ink" },
  in_progress: { label: "En traitement", cls: "bg-ochre text-cream" },
  done: { label: "Traitée", cls: "bg-ink text-cream" },
  archived: { label: "Archivée", cls: "bg-clay/20 text-clay" },
};

const STATUS_META: Record<Trip["status"], { label: string; cls: string }> = {
  devis: { label: "Devis", cls: "bg-sand text-ink" },
  confirme: { label: "Confirmé", cls: "bg-ink text-cream" },
  en_cours: { label: "En cours", cls: "bg-ochre text-cream" },
  termine: { label: "Terminé", cls: "bg-clay/20 text-clay" },
  annule: { label: "Annulé", cls: "bg-red-100 text-red-800" },
};

const CATEGORY_LABEL: Record<string, string> = {
  itineraire: "Itinéraire",
  guide: "Carnet de voyage / Guide",
  voucher: "Voucher",
  billet: "Billet",
  assurance: "Assurance",
  autre: "Autre document",
};

export function EspaceDashboard() {
  const { user, isAdmin } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [documents, setDocuments] = useState<TripDocument[]>([]);
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [tab, setTab] = useState<"voyages" | "demandes" | "documents" | "paiements" | "factures" | "profil">("voyages");

  useEffect(() => {
    if (!user) return;
    void loadAll(user.id);
    // Realtime: nouvelles demandes de devis qui apparaissent instantanément
    const channel = supabase
      .channel(`espace-${user.id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "contact_requests", filter: `user_id=eq.${user.id}` },
        () => {
          void loadRequests(user.id);
        },
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "trips", filter: `user_id=eq.${user.id}` },
        () => {
          void loadTrips(user.id);
        },
      )
      .subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  async function loadAll(uid: string) {
    const [{ data: p }, { data: t }, { data: i }, { data: d }, { data: r }] = await Promise.all([
      supabase.from("profiles").select("*").eq("user_id", uid).maybeSingle(),
      supabase.from("trips").select("*").eq("user_id", uid).order("created_at", { ascending: false }),
      supabase.from("invoices").select("*").eq("user_id", uid).order("issued_at", { ascending: false }),
      supabase.from("trip_documents").select("*").eq("user_id", uid).order("created_at", { ascending: false }),
      supabase.from("contact_requests").select("*").eq("user_id", uid).order("created_at", { ascending: false }),
    ]);
    setProfile(p as Profile | null);
    setTrips((t as Trip[]) ?? []);
    setInvoices((i as Invoice[]) ?? []);
    setDocuments((d as TripDocument[]) ?? []);
    setRequests((r as ContactRequest[]) ?? []);
  }

  async function loadRequests(uid: string) {
    const { data } = await supabase
      .from("contact_requests")
      .select("*")
      .eq("user_id", uid)
      .order("created_at", { ascending: false });
    setRequests((data as ContactRequest[]) ?? []);
  }

  async function loadTrips(uid: string) {
    const { data } = await supabase
      .from("trips")
      .select("*")
      .eq("user_id", uid)
      .order("created_at", { ascending: false });
    setTrips((data as Trip[]) ?? []);
  }

  if (!user) return null;
  const fullName = [profile?.first_name, profile?.last_name].filter(Boolean).join(" ") || user.email;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-border pb-8">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-clay mb-3">Espace voyageur</p>
          <h1 className="font-display text-4xl md:text-5xl text-ink">Bonjour {fullName}</h1>
          <p className="text-clay font-sans text-sm mt-2">
            Retrouvez ici vos voyages, itinéraires, documents et paiements en un seul endroit.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/demande-de-devis"
            className="text-[10px] uppercase tracking-[0.3em] bg-ink text-cream px-4 py-2 hover:bg-clay transition"
          >
            Nouvelle demande
          </Link>
          {isAdmin && (
            <Link
              to="/admin"
              className="text-[10px] uppercase tracking-[0.3em] border border-ink px-4 py-2 hover:bg-ink hover:text-cream transition"
            >
              Admin
            </Link>
          )}
          <button
            onClick={() => supabase.auth.signOut()}
            className="text-[10px] uppercase tracking-[0.3em] text-clay hover:text-ink transition"
          >
            Se déconnecter
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border">
        {[
          ["voyages", `Mes voyages (${trips.length})`],
          ["demandes", `Mes demandes (${requests.length})`],
          ["documents", `Documents (${documents.length})`],
          ["paiements", "Paiements & solde"],
          ["factures", `Factures (${invoices.length})`],
          ["profil", "Mes informations"],
        ].map(([k, label]) => (
          <button
            key={k}
            onClick={() => setTab(k as typeof tab)}
            className={`px-5 py-3 text-[11px] uppercase tracking-[0.22em] font-sans transition border-b-2 -mb-px ${
              tab === k ? "border-ink text-ink" : "border-transparent text-clay hover:text-ink"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "voyages" && <TripsList trips={trips} documents={documents} />}
      {tab === "demandes" && <RequestsList requests={requests} />}
      {tab === "documents" && <DocumentsList documents={documents} trips={trips} />}
      {tab === "paiements" && <PaymentsList trips={trips} invoices={invoices} />}
      {tab === "factures" && <InvoicesList invoices={invoices} />}
      {tab === "profil" && profile && <ProfileForm profile={profile} onSaved={() => loadAll(user.id)} />}
      {tab === "profil" && !profile && (
        <p className="text-clay font-sans text-sm">Profil en cours de création…</p>
      )}
    </div>
  );
}

function RequestsList({ requests }: { requests: ContactRequest[] }) {
  if (!requests.length)
    return (
      <div className="border border-border p-10 text-center">
        <p className="font-display text-2xl text-ink mb-3">Aucune demande pour l'instant</p>
        <p className="text-clay font-sans text-sm mb-6">
          Vos demandes de devis sur mesure apparaîtront ici dès leur envoi.
        </p>
        <Link
          to="/demande-de-devis"
          className="inline-block bg-ink text-cream px-6 py-3 text-[11px] uppercase tracking-[0.3em] hover:bg-clay transition"
        >
          Faire une demande
        </Link>
      </div>
    );

  return (
    <div className="space-y-4">
      {requests.map((r) => {
        const meta = REQUEST_STATUS_META[r.status] ?? REQUEST_STATUS_META.new;
        return (
          <div key={r.id} className="border border-border p-6">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span className={`text-[10px] uppercase tracking-[0.25em] px-2 py-1 ${meta.cls}`}>
                {meta.label}
              </span>
              <span className="text-[11px] text-clay font-sans">
                {new Date(r.created_at).toLocaleDateString("fr-FR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <p className="font-display text-2xl text-ink">{r.destination}</p>
            <p className="text-sm text-clay font-sans mt-1">
              {r.period} · {r.travelers} voyageur(s) · Budget {r.budget}
            </p>
            <p className="text-sm text-ink/80 font-sans mt-3 whitespace-pre-line border-l-2 border-sand pl-3">
              {r.message}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function TripsList({ trips, documents }: { trips: Trip[]; documents: TripDocument[] }) {
  if (!trips.length)
    return (
      <div className="border border-border p-10 text-center">
        <p className="font-display text-2xl text-ink mb-3">Aucun voyage pour l'instant</p>
        <p className="text-clay font-sans text-sm mb-6">
          Vos devis et voyages confirmés apparaîtront ici.
        </p>
        <Link
          to="/demande-de-devis"
          className="inline-block bg-ink text-cream px-6 py-3 text-[11px] uppercase tracking-[0.3em] hover:bg-clay transition"
        >
          Demander un devis
        </Link>
      </div>
    );

  return (
    <div className="space-y-4">
      {trips.map((t) => {
        const meta = STATUS_META[t.status];
        const tripDocs = documents.filter((d) => d.trip_id === t.id);
        return (
          <div key={t.id} className="border border-border p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className={`text-[10px] uppercase tracking-[0.25em] px-2 py-1 ${meta.cls}`}>
                {meta.label}
              </span>
              {t.amount ? (
                <span className="text-[11px] text-clay font-sans">
                  {Number(t.amount).toLocaleString("fr-FR")} €
                </span>
              ) : null}
            </div>
            <p className="font-display text-2xl text-ink">{t.title}</p>
            <p className="text-sm text-clay font-sans mt-1">
              {t.destination}
              {t.start_date && ` · ${new Date(t.start_date).toLocaleDateString("fr-FR")}`}
              {t.end_date && ` → ${new Date(t.end_date).toLocaleDateString("fr-FR")}`}
              {t.travelers && ` · ${t.travelers} voyageur${t.travelers > 1 ? "s" : ""}`}
            </p>
            {t.notes && (
              <p className="text-sm text-ink/80 font-sans mt-3 whitespace-pre-line border-l-2 border-sand pl-3">
                {t.notes}
              </p>
            )}
            {tripDocs.length > 0 && (
              <div className="mt-5 pt-4 border-t border-border">
                <p className="text-[10px] uppercase tracking-[0.3em] text-clay mb-3">
                  Documents associés ({tripDocs.length})
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {tripDocs.map((d) => (
                    <DocCard key={d.id} doc={d} />
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function DocCard({ doc }: { doc: TripDocument }) {
  const open = async () => {
    const { data, error } = await supabase.storage.from("trip-documents").createSignedUrl(doc.file_path, 300);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank");
    else alert(error?.message ?? "Erreur de téléchargement");
  };
  return (
    <button
      onClick={open}
      className="text-left border border-border p-3 hover:bg-sand/40 transition flex items-start gap-3"
    >
      <span className="text-ochre text-lg leading-none mt-0.5">◆</span>
      <span className="flex-1 min-w-0">
        <span className="block text-[10px] uppercase tracking-[0.25em] text-clay">
          {CATEGORY_LABEL[doc.category] ?? doc.category}
        </span>
        <span className="block font-display text-base text-ink mt-0.5 truncate">{doc.title}</span>
        <span className="block text-[11px] text-clay font-sans truncate">{doc.file_name}</span>
      </span>
    </button>
  );
}

function DocumentsList({ documents, trips }: { documents: TripDocument[]; trips: Trip[] }) {
  if (!documents.length)
    return (
      <div className="border border-border p-10 text-center">
        <p className="font-display text-2xl text-ink mb-2">Aucun document pour le moment</p>
        <p className="text-clay font-sans text-sm">
          Votre conseillère déposera ici votre itinéraire détaillé, vos vouchers, billets et carnet de voyage.
        </p>
      </div>
    );

  const tripById = new Map(trips.map((t) => [t.id, t]));

  return (
    <div className="border border-border divide-y divide-border">
      {documents.map((doc) => {
        const trip = tripById.get(doc.trip_id);
        return (
          <div key={doc.id} className="p-4 flex items-center justify-between gap-4 flex-wrap">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.3em] text-clay">
                {CATEGORY_LABEL[doc.category] ?? doc.category}
                {trip && ` · ${trip.title}`}
              </p>
              <p className="font-display text-lg text-ink mt-1">{doc.title}</p>
              <p className="text-xs text-clay font-sans">
                {doc.file_name} · {new Date(doc.created_at).toLocaleDateString("fr-FR")}
              </p>
            </div>
            <button
              onClick={async () => {
                const { data } = await supabase.storage.from("trip-documents").createSignedUrl(doc.file_path, 300);
                if (data?.signedUrl) window.open(data.signedUrl, "_blank");
              }}
              className="text-[11px] uppercase tracking-[0.25em] border border-ink px-4 py-2 hover:bg-ink hover:text-cream transition"
            >
              Télécharger
            </button>
          </div>
        );
      })}
    </div>
  );
}

function PaymentsList({ trips, invoices }: { trips: Trip[]; invoices: Invoice[] }) {
  const rows = trips
    .filter((t) => t.status !== "annule")
    .map((t) => {
      const paid = invoices
        .filter((i) => i.trip_id === t.id)
        .reduce((s, i) => s + Number(i.amount || 0), 0);
      const total = Number(t.amount || 0);
      const remaining = Math.max(total - paid, 0);
      return { trip: t, total, paid, remaining };
    });

  const totalPaid = rows.reduce((s, r) => s + r.paid, 0);
  const totalDue = rows.reduce((s, r) => s + r.remaining, 0);

  if (!rows.length)
    return (
      <div className="border border-border p-10 text-center">
        <p className="font-display text-2xl text-ink mb-2">Aucun paiement à afficher</p>
        <p className="text-clay font-sans text-sm">Vos paiements et soldes apparaîtront ici dès qu'un devis sera confirmé.</p>
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="border border-border p-6 bg-sand/30">
          <p className="text-[10px] uppercase tracking-[0.3em] text-clay">Total réglé</p>
          <p className="font-display text-3xl text-ink mt-2">{totalPaid.toLocaleString("fr-FR")} €</p>
        </div>
        <div className="border border-ochre p-6 bg-ochre/10">
          <p className="text-[10px] uppercase tracking-[0.3em] text-ochre">Solde restant à régler</p>
          <p className="font-display text-3xl text-ink mt-2">{totalDue.toLocaleString("fr-FR")} €</p>
        </div>
      </div>

      <div className="border border-border divide-y divide-border">
        {rows.map(({ trip, total, paid, remaining }) => {
          const pct = total > 0 ? Math.min((paid / total) * 100, 100) : 0;
          return (
            <div key={trip.id} className="p-5">
              <div className="flex justify-between items-start mb-3 gap-4 flex-wrap">
                <div>
                  <p className="font-display text-lg text-ink">{trip.title}</p>
                  <p className="text-xs text-clay font-sans">{trip.destination}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-clay">Total voyage</p>
                  <p className="font-display text-xl text-ink">{total.toLocaleString("fr-FR")} €</p>
                </div>
              </div>
              <div className="h-1.5 bg-sand rounded-full overflow-hidden">
                <div className="h-full bg-ink transition-all" style={{ width: `${pct}%` }} />
              </div>
              <div className="flex justify-between mt-2 text-xs font-sans text-clay">
                <span>Réglé : <strong className="text-ink">{paid.toLocaleString("fr-FR")} €</strong></span>
                <span>Reste : <strong className={remaining > 0 ? "text-ochre" : "text-ink"}>{remaining.toLocaleString("fr-FR")} €</strong></span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function InvoicesList({ invoices }: { invoices: Invoice[] }) {
  const download = async (path: string) => {
    const { data, error } = await supabase.storage.from("invoices").createSignedUrl(path, 60);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank");
    else alert(error?.message ?? "Erreur de téléchargement");
  };

  if (!invoices.length)
    return (
      <div className="border border-border p-10 text-center">
        <p className="font-display text-2xl text-ink mb-2">Aucune facture</p>
        <p className="text-clay font-sans text-sm">Vos factures apparaîtront ici dès qu'elles seront émises.</p>
      </div>
    );

  return (
    <div className="border border-border divide-y divide-border">
      {invoices.map((inv) => (
        <div key={inv.id} className="p-5 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="font-display text-lg text-ink">N° {inv.invoice_number}</p>
            <p className="text-xs text-clay font-sans">
              {new Date(inv.issued_at).toLocaleDateString("fr-FR")} · {Number(inv.amount).toLocaleString("fr-FR")} €
            </p>
          </div>
          {inv.pdf_path ? (
            <button
              onClick={() => download(inv.pdf_path!)}
              className="text-[11px] uppercase tracking-[0.25em] border border-ink px-4 py-2 hover:bg-ink hover:text-cream transition"
            >
              Télécharger PDF
            </button>
          ) : (
            <span className="text-[11px] text-clay font-sans">PDF en préparation</span>
          )}
        </div>
      ))}
    </div>
  );
}

function ProfileForm({ profile, onSaved }: { profile: Profile; onSaved: () => void }) {
  const [form, setForm] = useState(profile);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const update = (k: keyof Profile, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const save = async () => {
    setSaving(true);
    setMsg(null);
    const { error } = await supabase
      .from("profiles")
      .update({
        first_name: form.first_name,
        last_name: form.last_name,
        phone: form.phone,
        address: form.address,
        city: form.city,
        postal_code: form.postal_code,
        country: form.country,
        birth_date: form.birth_date,
        nationality: form.nationality,
        emergency_contact_name: form.emergency_contact_name,
        emergency_contact_phone: form.emergency_contact_phone,
      })
      .eq("id", profile.id);
    setSaving(false);
    if (error) setMsg("Erreur : " + error.message);
    else {
      setMsg("Informations enregistrées.");
      onSaved();
    }
  };

  const renderField = (label: string, k: keyof Profile, type: string = "text") => (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.25em] text-clay">{label}</span>
      <input
        type={type}
        value={(form[k] as string | null) ?? ""}
        onChange={(e) => update(k, e.target.value)}
        className="mt-1 w-full border border-border bg-cream px-3 py-2 font-sans text-sm text-ink focus:outline-none focus:border-ink"
      />
    </label>
  );

  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-display text-2xl text-ink mb-1">Vos coordonnées</h2>
        <p className="text-xs text-clay font-sans mb-6">
          Pour vous joindre rapidement avant et pendant votre voyage. Aucune pièce d'identité ne vous est demandée en ligne — elles seront échangées directement avec votre conseillère.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {renderField("Prénom", "first_name")}
          {renderField("Nom", "last_name")}
          {renderField("Téléphone", "phone", "tel")}
          {renderField("Date de naissance", "birth_date", "date")}
          {renderField("Nationalité", "nationality")}
          {renderField("Pays", "country")}
          {renderField("Adresse", "address")}
          <div className="grid grid-cols-2 gap-4">
            {renderField("Code postal", "postal_code")}
            {renderField("Ville", "city")}
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-8">
        <h2 className="font-display text-2xl text-ink mb-1">Contact d'urgence</h2>
        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          {renderField("Nom", "emergency_contact_name")}
          {renderField("Téléphone", "emergency_contact_phone", "tel")}
        </div>
      </div>

      <div className="border-t border-border pt-8 flex items-center justify-between gap-4">
        {msg && <p className="text-sm font-sans text-clay">{msg}</p>}
        <button
          onClick={save}
          disabled={saving}
          className="bg-ink text-cream px-8 py-3 text-[11px] uppercase tracking-[0.3em] hover:bg-clay transition disabled:opacity-50 ml-auto"
        >
          {saving ? "Enregistrement…" : "Enregistrer"}
        </button>
      </div>
    </div>
  );
}
