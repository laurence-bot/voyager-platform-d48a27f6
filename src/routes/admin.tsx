import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — La Voyagerie" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

type Customer = {
  user_id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
};

function AdminPage() {
  const { user, loading, isAdmin } = useAuth();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (!isAdmin) return;
    void loadCustomers();
  }, [isAdmin]);

  async function loadCustomers() {
    const { data: profiles } = await supabase
      .from("profiles")
      .select("user_id, email, first_name, last_name")
      .order("created_at", { ascending: false });
    setCustomers((profiles as Customer[]) ?? []);
  }

  if (loading) return <Shell><p className="text-clay">Chargement…</p></Shell>;
  if (!user) return <Shell><p className="text-clay font-sans">Connectez-vous d'abord depuis <Link to="/espace" className="underline">votre espace</Link>.</p></Shell>;
  if (!isAdmin) return <Shell><p className="text-clay font-sans">Accès réservé à l'équipe La Voyagerie.</p></Shell>;

  return (
    <Shell>
      <div className="grid md:grid-cols-[320px_1fr] gap-8">
        <aside className="border border-border">
          <div className="p-4 border-b border-border">
            <p className="text-[11px] uppercase tracking-[0.3em] text-clay">Voyageurs ({customers.length})</p>
          </div>
          <div className="divide-y divide-border max-h-[70vh] overflow-y-auto">
            {customers.map((c) => (
              <button
                key={c.user_id}
                onClick={() => setSelected(c.user_id)}
                className={`w-full text-left p-4 hover:bg-sand/40 transition ${
                  selected === c.user_id ? "bg-sand/60" : ""
                }`}
              >
                <p className="font-display text-base text-ink">
                  {[c.first_name, c.last_name].filter(Boolean).join(" ") || c.email}
                </p>
                <p className="text-xs text-clay font-sans">{c.email}</p>
              </button>
            ))}
            {!customers.length && (
              <p className="p-4 text-clay font-sans text-sm">Aucun voyageur encore.</p>
            )}
          </div>
        </aside>

        <section>
          {selected ? (
            <CustomerEditor userId={selected} onChange={loadCustomers} />
          ) : (
            <div className="border border-border p-10 text-clay font-sans">
              Sélectionnez un voyageur dans la liste.
            </div>
          )}
        </section>
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen paper">
      <SiteHeader />
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-[1500px] mx-auto">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-clay mb-3">Administration</p>
            <h1 className="font-display text-4xl md:text-5xl text-ink">Voyageurs</h1>
          </div>
          <Link to="/espace" className="text-[10px] uppercase tracking-[0.3em] text-clay hover:text-ink">
            ← Mon espace
          </Link>
        </div>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}

const DOC_CATEGORIES = [
  ["itineraire", "Itinéraire"],
  ["guide", "Carnet de voyage / Guide"],
  ["voucher", "Voucher"],
  ["billet", "Billet"],
  ["assurance", "Assurance"],
  ["autre", "Autre document"],
] as const;

function CustomerEditor({ userId, onChange }: { userId: string; onChange: () => void }) {
  const [trips, setTrips] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [newTrip, setNewTrip] = useState({ title: "", destination: "", amount: "", status: "devis" });
  const [newInvoice, setNewInvoice] = useState({ invoice_number: "", amount: "", trip_id: "" });
  const [newDoc, setNewDoc] = useState({ trip_id: "", category: "itineraire", title: "", file: null as File | null });
  const [uploading, setUploading] = useState(false);
  const [docMsg, setDocMsg] = useState<string | null>(null);

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  async function load() {
    const [{ data: t }, { data: i }, { data: d }] = await Promise.all([
      supabase.from("trips").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
      supabase.from("invoices").select("*").eq("user_id", userId).order("issued_at", { ascending: false }),
      supabase.from("trip_documents").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
    ]);
    setTrips(t ?? []);
    setInvoices(i ?? []);
    setDocuments(d ?? []);
  }

  const addTrip = async () => {
    if (!newTrip.title || !newTrip.destination) return;
    await supabase.from("trips").insert({
      user_id: userId,
      title: newTrip.title,
      destination: newTrip.destination,
      amount: newTrip.amount ? Number(newTrip.amount) : 0,
      status: newTrip.status as any,
    });
    setNewTrip({ title: "", destination: "", amount: "", status: "devis" });
    await load();
    onChange();
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("trips").update({ status: status as any }).eq("id", id);
    await load();
    onChange();
  };

  const addInvoice = async () => {
    if (!newInvoice.invoice_number) return;
    await supabase.from("invoices").insert({
      user_id: userId,
      invoice_number: newInvoice.invoice_number,
      amount: newInvoice.amount ? Number(newInvoice.amount) : 0,
      trip_id: newInvoice.trip_id || null,
    });
    setNewInvoice({ invoice_number: "", amount: "", trip_id: "" });
    await load();
  };

  const uploadDoc = async () => {
    setDocMsg(null);
    if (!newDoc.file || !newDoc.trip_id || !newDoc.title) {
      setDocMsg("Sélectionnez un voyage, un titre et un fichier.");
      return;
    }
    setUploading(true);
    const ext = newDoc.file.name.split(".").pop() ?? "bin";
    const path = `${userId}/${newDoc.trip_id}/${Date.now()}-${newDoc.category}.${ext}`;
    const { error: upErr } = await supabase.storage
      .from("trip-documents")
      .upload(path, newDoc.file, { contentType: newDoc.file.type, upsert: false });
    if (upErr) {
      setUploading(false);
      setDocMsg("Erreur upload : " + upErr.message);
      return;
    }
    const { error: insErr } = await supabase.from("trip_documents").insert({
      user_id: userId,
      trip_id: newDoc.trip_id,
      title: newDoc.title,
      category: newDoc.category,
      file_path: path,
      file_name: newDoc.file.name,
    });
    setUploading(false);
    if (insErr) setDocMsg("Erreur enregistrement : " + insErr.message);
    else {
      setDocMsg("Document ajouté.");
      setNewDoc({ trip_id: "", category: "itineraire", title: "", file: null });
      await load();
    }
  };

  const deleteDoc = async (doc: any) => {
    if (!confirm(`Supprimer "${doc.title}" ?`)) return;
    await supabase.storage.from("trip-documents").remove([doc.file_path]);
    await supabase.from("trip_documents").delete().eq("id", doc.id);
    await load();
  };

  return (
    <div className="space-y-10">
      <section className="border border-border p-6">
        <h2 className="font-display text-2xl text-ink mb-4">Ajouter un voyage / devis</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <input placeholder="Titre" value={newTrip.title} onChange={(e) => setNewTrip({ ...newTrip, title: e.target.value })} className="border border-border bg-cream px-3 py-2 text-sm font-sans" />
          <input placeholder="Destination" value={newTrip.destination} onChange={(e) => setNewTrip({ ...newTrip, destination: e.target.value })} className="border border-border bg-cream px-3 py-2 text-sm font-sans" />
          <input placeholder="Montant €" type="number" value={newTrip.amount} onChange={(e) => setNewTrip({ ...newTrip, amount: e.target.value })} className="border border-border bg-cream px-3 py-2 text-sm font-sans" />
          <select value={newTrip.status} onChange={(e) => setNewTrip({ ...newTrip, status: e.target.value })} className="border border-border bg-cream px-3 py-2 text-sm font-sans">
            <option value="devis">Devis</option>
            <option value="confirme">Confirmé</option>
            <option value="en_cours">En cours</option>
            <option value="termine">Terminé</option>
            <option value="annule">Annulé</option>
          </select>
        </div>
        <button onClick={addTrip} className="mt-4 bg-ink text-cream px-5 py-2.5 text-[11px] uppercase tracking-[0.3em] hover:bg-clay">
          Ajouter
        </button>
      </section>

      <section>
        <h2 className="font-display text-2xl text-ink mb-4">Voyages ({trips.length})</h2>
        <div className="border border-border divide-y divide-border">
          {trips.map((t) => (
            <div key={t.id} className="p-4 flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="font-display text-lg text-ink">{t.title}</p>
                <p className="text-xs text-clay font-sans">{t.destination} · {Number(t.amount || 0).toLocaleString("fr-FR")} €</p>
              </div>
              <select value={t.status} onChange={(e) => updateStatus(t.id, e.target.value)} className="border border-border bg-cream px-3 py-2 text-xs font-sans">
                <option value="devis">Devis</option>
                <option value="confirme">Confirmé</option>
                <option value="en_cours">En cours</option>
                <option value="termine">Terminé</option>
                <option value="annule">Annulé</option>
              </select>
            </div>
          ))}
          {!trips.length && <p className="p-4 text-clay font-sans text-sm">Aucun voyage.</p>}
        </div>
      </section>

      <section className="border border-border p-6">
        <h2 className="font-display text-2xl text-ink mb-4">Déposer un document (itinéraire, guide, voucher…)</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <select value={newDoc.trip_id} onChange={(e) => setNewDoc({ ...newDoc, trip_id: e.target.value })} className="border border-border bg-cream px-3 py-2 text-sm font-sans">
            <option value="">— Voyage concerné —</option>
            {trips.map((t) => <option key={t.id} value={t.id}>{t.title}</option>)}
          </select>
          <select value={newDoc.category} onChange={(e) => setNewDoc({ ...newDoc, category: e.target.value })} className="border border-border bg-cream px-3 py-2 text-sm font-sans">
            {DOC_CATEGORIES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
          <input placeholder="Titre affiché au client" value={newDoc.title} onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })} className="border border-border bg-cream px-3 py-2 text-sm font-sans sm:col-span-2" />
          <input type="file" onChange={(e) => setNewDoc({ ...newDoc, file: e.target.files?.[0] ?? null })} className="border border-border bg-cream px-3 py-2 text-sm font-sans sm:col-span-2" />
        </div>
        <div className="mt-4 flex items-center gap-4">
          <button onClick={uploadDoc} disabled={uploading} className="bg-ink text-cream px-5 py-2.5 text-[11px] uppercase tracking-[0.3em] hover:bg-clay disabled:opacity-50">
            {uploading ? "Envoi…" : "Téléverser"}
          </button>
          {docMsg && <p className="text-xs text-clay font-sans">{docMsg}</p>}
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl text-ink mb-4">Documents ({documents.length})</h2>
        <div className="border border-border divide-y divide-border">
          {documents.map((d) => {
            const trip = trips.find((t) => t.id === d.trip_id);
            return (
              <div key={d.id} className="p-4 flex justify-between items-center gap-4 flex-wrap">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-clay">
                    {DOC_CATEGORIES.find(([v]) => v === d.category)?.[1] ?? d.category}
                    {trip && ` · ${trip.title}`}
                  </p>
                  <p className="font-display text-base text-ink">{d.title}</p>
                  <p className="text-xs text-clay font-sans">{d.file_name}</p>
                </div>
                <button onClick={() => deleteDoc(d)} className="text-[10px] uppercase tracking-[0.25em] text-red-700 hover:underline">
                  Supprimer
                </button>
              </div>
            );
          })}
          {!documents.length && <p className="p-4 text-clay font-sans text-sm">Aucun document.</p>}
        </div>
      </section>

      <section className="border border-border p-6">
        <h2 className="font-display text-2xl text-ink mb-4">Ajouter une facture</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          <input placeholder="N° facture" value={newInvoice.invoice_number} onChange={(e) => setNewInvoice({ ...newInvoice, invoice_number: e.target.value })} className="border border-border bg-cream px-3 py-2 text-sm font-sans" />
          <input placeholder="Montant €" type="number" value={newInvoice.amount} onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })} className="border border-border bg-cream px-3 py-2 text-sm font-sans" />
          <select value={newInvoice.trip_id} onChange={(e) => setNewInvoice({ ...newInvoice, trip_id: e.target.value })} className="border border-border bg-cream px-3 py-2 text-sm font-sans">
            <option value="">— Voyage lié (optionnel) —</option>
            {trips.map((t) => <option key={t.id} value={t.id}>{t.title}</option>)}
          </select>
        </div>
        <button onClick={addInvoice} className="mt-4 bg-ink text-cream px-5 py-2.5 text-[11px] uppercase tracking-[0.3em] hover:bg-clay">
          Ajouter la facture
        </button>
        <p className="text-[10px] text-clay font-sans mt-3">PDF à téléverser ensuite via le bucket "invoices" — sous le dossier {userId.slice(0, 8)}…</p>
      </section>

      <section>
        <h2 className="font-display text-2xl text-ink mb-4">Factures ({invoices.length})</h2>
        <div className="border border-border divide-y divide-border">
          {invoices.map((inv) => (
            <div key={inv.id} className="p-4 flex justify-between items-center">
              <div>
                <p className="font-display text-base text-ink">N° {inv.invoice_number}</p>
                <p className="text-xs text-clay font-sans">{Number(inv.amount).toLocaleString("fr-FR")} €</p>
              </div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-clay">
                {inv.pdf_path ? "PDF ✓" : "PDF manquant"}
              </span>
            </div>
          ))}
          {!invoices.length && <p className="p-4 text-clay font-sans text-sm">Aucune facture.</p>}
        </div>
      </section>
    </div>
  );
}
