import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/agence")({
  head: () => ({
    meta: [
      { title: "Espace Agence — La Voyagerie" },
      { name: "description", content: "Espace réservé à l'équipe La Voyagerie. Accès TravelFlow." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AgencePage,
});

function AgencePage() {
  return (
    <div className="min-h-screen bg-cream">
      <SiteHeader />
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        <TravelFlowPanel />
      </main>
      <SiteFooter />
    </div>
  );
}

function AgenceLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setLoading(false);
    if (error) setError("Identifiants invalides.");
  };

  return (
    <div className="max-w-md mx-auto bg-white border border-clay/15 p-10">
      <p className="font-sans text-[10px] tracking-[0.3em] text-clay uppercase mb-3">Réservé à l'équipe</p>
      <h1 className="font-display text-3xl text-ink mb-6">Espace Agence</h1>
      <p className="font-sans text-sm text-clay mb-8">
        Accès au tableau de bord interne TravelFlow. Réservé aux conseillers La Voyagerie.
      </p>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block font-sans text-xs text-clay mb-2">Email professionnel</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-clay/30 px-4 py-3 font-sans text-sm bg-cream focus:outline-none focus:border-ink"
          />
        </div>
        <div>
          <label className="block font-sans text-xs text-clay mb-2">Mot de passe</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-clay/30 px-4 py-3 font-sans text-sm bg-cream focus:outline-none focus:border-ink"
          />
        </div>
        {error && <p className="font-sans text-xs text-red-700">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-ink text-cream py-3 font-sans text-xs tracking-[0.3em] uppercase hover:bg-ink/90 disabled:opacity-50"
        >
          {loading ? "Connexion…" : "Se connecter"}
        </button>
      </form>
      <p className="font-sans text-[11px] text-clay/70 mt-6 text-center">
        Pas encore de compte agence ? Contactez l'administrateur.
      </p>
    </div>
  );
}

function AccessDenied() {
  return (
    <div className="max-w-md mx-auto bg-white border border-clay/15 p-10 text-center">
      <h1 className="font-display text-2xl text-ink mb-4">Accès refusé</h1>
      <p className="font-sans text-sm text-clay mb-6">
        Votre compte n'a pas les droits d'accès à l'espace agence.
      </p>
      <button
        onClick={() => supabase.auth.signOut()}
        className="font-sans text-xs tracking-[0.3em] uppercase text-ink underline"
      >
        Se déconnecter
      </button>
    </div>
  );
}

function TravelFlowPanel() {
  const { user } = useAuth();
  // TODO: brancher l'iframe / API TravelFlow ici une fois le projet finalisé.
  // Exemple futur : <iframe src={`${TRAVELFLOW_URL}/embed?token=${ssoToken}`} />
  const travelflowUrl = ""; // À renseigner quand TravelFlow sera prêt

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <p className="font-sans text-[10px] tracking-[0.3em] text-clay uppercase mb-2">Espace Agence</p>
          <h1 className="font-display text-4xl text-ink">TravelFlow</h1>
          <p className="font-sans text-sm text-clay mt-2">Connecté en tant que {user?.email}</p>
        </div>
        <button
          onClick={() => supabase.auth.signOut()}
          className="font-sans text-[11px] tracking-[0.3em] uppercase text-clay hover:text-ink"
        >
          Déconnexion
        </button>
      </header>

      {travelflowUrl ? (
        <div className="bg-white border border-clay/15 overflow-hidden" style={{ height: "80vh" }}>
          <iframe
            src={travelflowUrl}
            className="w-full h-full border-0"
            title="TravelFlow"
          />
        </div>
      ) : (
        <div className="bg-white border border-clay/15 p-12 text-center">
          <div className="inline-block px-4 py-1 bg-cream border border-clay/20 font-sans text-[10px] tracking-[0.3em] text-clay uppercase mb-6">
            En cours de développement
          </div>
          <h2 className="font-display text-2xl text-ink mb-4">TravelFlow arrive bientôt</h2>
          <p className="font-sans text-sm text-clay max-w-lg mx-auto leading-relaxed">
            L'outil interne de gestion des voyages est en cours de finalisation.
            Une fois prêt, il sera intégré directement ici pour permettre à l'équipe
            de gérer devis, itinéraires et clients sans quitter le site.
          </p>
        </div>
      )}
    </div>
  );
}
