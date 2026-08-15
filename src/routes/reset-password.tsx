import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Nouveau mot de passe — La Voyagerie" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Supabase place le token dans le hash et déclenche PASSWORD_RECOVERY
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 8) return setError("8 caractères minimum.");
    if (password !== confirm) return setError("Les mots de passe ne correspondent pas.");
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) setError(error.message);
    else {
      setDone(true);
      setTimeout(() => navigate({ to: "/espace", search: {} }), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <SiteHeader />
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-md mx-auto">
        <p className="text-[11px] uppercase tracking-[0.3em] text-clay text-center mb-4">Sécurité</p>
        <h1 className="font-display text-4xl md:text-5xl text-ink text-center mb-3">Nouveau mot de passe</h1>
        <p className="text-center text-clay font-sans text-sm mb-10">
          Choisissez un mot de passe d'au moins 8 caractères.
        </p>

        {done ? (
          <div className="border border-border bg-sand/40 p-8 text-center">
            <p className="font-display text-xl text-ink mb-2">Mot de passe mis à jour</p>
            <p className="text-sm text-clay font-sans">Redirection vers votre espace…</p>
          </div>
        ) : !ready ? (
          <p className="text-center text-clay font-sans text-sm">
            Lien invalide ou expiré.{" "}
            <Link to="/espace" search={{}} className="underline hover:text-ink">Retour</Link>
          </p>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nouveau mot de passe"
              className="w-full border border-border bg-cream px-4 py-3 font-sans text-sm text-ink placeholder:text-clay/60 focus:outline-none focus:border-ink"
            />
            <input
              type="password"
              required
              minLength={8}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirmer le mot de passe"
              className="w-full border border-border bg-cream px-4 py-3 font-sans text-sm text-ink placeholder:text-clay/60 focus:outline-none focus:border-ink"
            />
            {error && <p className="text-xs text-red-700 font-sans">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-ink text-cream py-4 text-[11px] uppercase tracking-[0.3em] hover:bg-clay transition disabled:opacity-50"
            >
              {loading ? "…" : "Mettre à jour"}
            </button>
          </form>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
