import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Mode = "login" | "signup" | "forgot";

export function AuthCard({ nextPath }: { nextPath?: string } = {}) {
  const safeNext = nextPath && nextPath.startsWith("/") && !nextPath.startsWith("//") ? nextPath : "/espace";
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const reset = () => {
    setError(null);
    setInfo(null);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    reset();
    setLoading(true);

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error) setError(traduireErreur(error.message));
    } else if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: `${window.location.origin}${safeNext}`,
          data: { first_name: firstName.trim(), last_name: lastName.trim() },
        },
      });
      if (error) setError(traduireErreur(error.message));
      else setInfo("Compte créé. Vérifiez votre boîte mail pour confirmer votre adresse, puis revenez vous connecter.");
    } else {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) setError(traduireErreur(error.message));
      else setInfo("Si un compte existe avec cette adresse, un lien de réinitialisation vient d'être envoyé.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto pt-12">
      <p className="text-[11px] uppercase tracking-[0.3em] text-clay text-center mb-4">Espace privé</p>
      <h1 className="font-display text-4xl md:text-5xl text-ink text-center mb-3">
        {mode === "signup" ? "Créer mon compte" : mode === "forgot" ? "Mot de passe oublié" : "Espace voyageur"}
      </h1>
      <p className="text-center text-clay font-sans text-sm mb-10">
        {mode === "signup"
          ? "Quelques secondes pour rejoindre le club La Voyagerie."
          : mode === "forgot"
            ? "Recevez un lien pour choisir un nouveau mot de passe."
            : "Retrouvez ici vos voyages, itinéraires, documents et paiements en un seul endroit."}
      </p>

      <form onSubmit={submit} className="space-y-4">
        {mode === "signup" && (
          <div className="grid grid-cols-2 gap-3">
            <input
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Prénom"
              className="border border-border bg-cream px-4 py-3 font-sans text-sm text-ink placeholder:text-clay/60 focus:outline-none focus:border-ink"
            />
            <input
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Nom"
              className="border border-border bg-cream px-4 py-3 font-sans text-sm text-ink placeholder:text-clay/60 focus:outline-none focus:border-ink"
            />
          </div>
        )}

        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="votre@email.fr"
          className="w-full border border-border bg-cream px-4 py-3 font-sans text-sm text-ink placeholder:text-clay/60 focus:outline-none focus:border-ink"
        />

        {mode !== "forgot" && (
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe (8 caractères min.)"
            className="w-full border border-border bg-cream px-4 py-3 font-sans text-sm text-ink placeholder:text-clay/60 focus:outline-none focus:border-ink"
          />
        )}

        {error && <p className="text-xs text-red-700 font-sans">{error}</p>}
        {info && <p className="text-xs text-ink font-sans bg-sand/60 border border-border p-3">{info}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-ink text-cream py-4 text-[11px] uppercase tracking-[0.3em] hover:bg-clay transition disabled:opacity-50"
        >
          {loading
            ? "…"
            : mode === "signup"
              ? "Créer mon compte"
              : mode === "forgot"
                ? "Envoyer le lien"
                : "Se connecter"}
        </button>
      </form>

      <div className="mt-8 flex justify-between text-[10px] uppercase tracking-[0.25em] text-clay font-sans">
        {mode === "login" ? (
          <>
            <button onClick={() => { reset(); setMode("forgot"); }} className="hover:text-ink transition">
              Mot de passe oublié
            </button>
            <button onClick={() => { reset(); setMode("signup"); }} className="hover:text-ink transition">
              Créer un compte →
            </button>
          </>
        ) : (
          <button onClick={() => { reset(); setMode("login"); }} className="hover:text-ink transition mx-auto">
            ← Retour à la connexion
          </button>
        )}
      </div>
    </div>
  );
}

function traduireErreur(msg: string): string {
  if (/invalid login credentials/i.test(msg)) return "Email ou mot de passe incorrect.";
  if (/email not confirmed/i.test(msg)) return "Adresse non confirmée — vérifiez votre boîte mail.";
  if (/user already registered/i.test(msg)) return "Un compte existe déjà avec cette adresse.";
  if (/password.*(short|weak|6)/i.test(msg)) return "Mot de passe trop court (8 caractères minimum).";
  return msg;
}
