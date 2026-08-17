import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  name: z.string().trim().min(2, "Votre nom est requis").max(100, "Maximum 100 caractères"),
  email: z.string().trim().email("Adresse email invalide").max(255),
  phone: z.string().trim().max(30, "Maximum 30 caractères").optional().or(z.literal("")),
  destination: z.string().trim().min(2, "Indiquez une destination ou un continent").max(120),
  travelers: z.string().min(1, "Précisez le nombre de voyageurs"),
  period: z.string().trim().min(2, "Précisez une période").max(80),
  budget: z.string().min(1, "Choisissez une fourchette de budget"),
  message: z
    .string()
    .trim()
    .min(20, "Quelques mots de plus pour bien vous comprendre (min. 20 caractères)")
    .max(2000, "Maximum 2000 caractères"),
  consent: z.literal(true, { message: "Merci d'accepter notre politique de confidentialité" }),
});

type FormData = z.infer<typeof schema>;

const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT?.trim() || "/api/public/contact";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [prefilled, setPrefilled] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<FormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any) as never,
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      destination: "",
      travelers: "",
      period: "",
      budget: "",
      message: "",
      consent: undefined as unknown as true,
    },
  });

  // Préremplissage si l'utilisateur est connecté
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: sess } = await supabase.auth.getSession();
      const user = sess.session?.user;
      if (!user || cancelled) return;
      const { data: profile } = await supabase
        .from("profiles")
        .select("first_name, last_name, email, phone")
        .eq("user_id", user.id)
        .maybeSingle();
      if (cancelled) return;
      const fullName =
        [profile?.first_name, profile?.last_name].filter(Boolean).join(" ").trim() ||
        (user.user_metadata?.first_name && user.user_metadata?.last_name
          ? `${user.user_metadata.first_name} ${user.user_metadata.last_name}`
          : "");
      if (fullName) setValue("name", fullName);
      const email = profile?.email || user.email || "";
      if (email) setValue("email", email);
      if (profile?.phone) setValue("phone", profile.phone);
      setPrefilled(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [setValue]);

  const onSubmit = async (data: FormData) => {
    setServerError(null);
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: data.name,
          email: data.email,
          telephone: data.phone || "",
          destination: data.destination,
          voyageurs: data.travelers,
          budget: data.budget,
          message: [
            data.destination && `Destination : ${data.destination}`,
            data.travelers && `Voyageurs : ${data.travelers}`,
            data.period && `Période : ${data.period}`,
            data.budget && `Budget : ${data.budget}`,
            "",
            data.message,
          ]
            .filter(Boolean)
            .join("\n"),
          website: "", // honeypot
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Envoi impossible");
      }
      setSubmitted(true);
      reset();
    } catch (e) {
      setServerError(
        e instanceof Error ? e.message : "Une erreur s'est produite. Veuillez réessayer.",
      );
    }
  };

  if (submitted) {
    return (
      <div className="border border-clay/40 bg-clay/5 p-10 md:p-14 text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-clay mb-6">✦ Message bien reçu</p>
        <h2 className="font-display text-3xl md:text-4xl mb-4">
          Merci. <em className="italic text-gold-gradient">Le récit commence.</em>
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Une de nos conseillères vous écrira sous trois jours ouvrés, à la main, pour engager la
          conversation.
          {prefilled && (
            <>
              <br />
              <br />
              Vous pouvez suivre l'avancement de votre demande à tout moment depuis votre{" "}
              <a href="/espace" className="underline hover:text-clay">
                espace voyageur
              </a>
              .
            </>
          )}
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-8 text-[11px] uppercase tracking-[0.3em] underline underline-offset-4 hover:text-clay"
        >
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
      {prefilled && (
        <p className="text-[11px] uppercase tracking-[0.25em] text-clay border border-border bg-sand/40 px-4 py-3">
          ✦ Vos coordonnées ont été pré-remplies depuis votre compte. Modifiez-les si besoin.
        </p>
      )}
      <div className="grid md:grid-cols-2 gap-6">
        <Field label="Nom complet" error={errors.name?.message} required>
          <input
            {...register("name")}
            type="text"
            autoComplete="name"
            className="field-input"
            placeholder="Jeanne Durand"
          />
        </Field>
        <Field label="Adresse email" error={errors.email?.message} required>
          <input
            {...register("email")}
            type="email"
            autoComplete="email"
            className="field-input"
            placeholder="vous@exemple.fr"
          />
        </Field>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Field label="Téléphone (optionnel)" error={errors.phone?.message}>
          <input
            {...register("phone")}
            type="tel"
            autoComplete="tel"
            className="field-input"
            placeholder="+33 6 ..."
          />
        </Field>
        <Field label="Destination ou région rêvée" error={errors.destination?.message} required>
          <input
            {...register("destination")}
            type="text"
            className="field-input"
            placeholder="Patagonie, Japon, Afrique australe…"
          />
        </Field>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Field label="Voyageurs" error={errors.travelers?.message} required>
          <select {...register("travelers")} className="field-input">
            <option value="">Choisir…</option>
            <option value="1">1 voyageur</option>
            <option value="2">2 voyageurs</option>
            <option value="3-4">3 à 4</option>
            <option value="5-8">5 à 8</option>
            <option value="9+">9 et plus</option>
          </select>
        </Field>
        <Field label="Période envisagée" error={errors.period?.message} required>
          <input
            {...register("period")}
            type="text"
            className="field-input"
            placeholder="Mars 2026, 15 jours…"
          />
        </Field>
        <Field label="Budget par voyageur" error={errors.budget?.message} required>
          <select {...register("budget")} className="field-input">
            <option value="">Choisir…</option>
            <option value="5-8k">5 000 – 8 000 €</option>
            <option value="8-12k">8 000 – 12 000 €</option>
            <option value="12-20k">12 000 – 20 000 €</option>
            <option value="20k+">20 000 € et plus</option>
            <option value="open">Sans contrainte</option>
          </select>
        </Field>
      </div>

      <Field label="Racontez-nous votre voyage" error={errors.message?.message} required>
        <textarea
          {...register("message")}
          rows={6}
          className="field-input resize-none"
          placeholder="Une saison, une humeur, un souvenir d'enfance, une rencontre que vous aimeriez faire…"
        />
      </Field>

      <label className="flex items-start gap-3 text-sm text-muted-foreground cursor-pointer">
        <input {...register("consent")} type="checkbox" className="mt-1 accent-clay w-4 h-4" />
        <span>
          J'accepte que mes données soient utilisées pour traiter ma demande, conformément à la{" "}
          <a href="/mentions-legales" className="underline hover:text-clay">
            politique de confidentialité
          </a>
          .
        </span>
      </label>
      {errors.consent && (
        <p className="text-sm text-destructive -mt-4">{errors.consent.message as string}</p>
      )}

      {/* Honeypot anti-bot — hidden from users */}
      <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
        <label>
          Ne pas remplir
          <input type="text" tabIndex={-1} autoComplete="off" name="company" />
        </label>
      </div>

      {serverError && (
        <p className="text-sm text-destructive border border-destructive/30 bg-destructive/5 p-4 rounded">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full md:w-auto bg-ink text-cream px-10 py-5 text-[11px] uppercase tracking-[0.3em] rounded-full hover:bg-clay transition disabled:opacity-50"
      >
        {isSubmitting ? "Envoi en cours…" : "Envoyer ma demande →"}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
        {label} {required && <span className="text-clay">*</span>}
      </span>
      {children}
      {error && <span className="block mt-1.5 text-xs text-destructive">{error}</span>}
    </label>
  );
}
