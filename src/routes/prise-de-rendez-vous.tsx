import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Check, Loader2 } from "lucide-react";
import { z } from "zod";

import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

const TITLE = "Prendre rendez-vous | La Voyagerie — Agence de voyage Cassis";
const DESC =
  "Réservez votre échange privé avec un conseiller La Voyagerie : choisissez votre date, votre créneau et l'objet de votre rendez-vous.";

export const Route = createFileRoute("/prise-de-rendez-vous")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "https://lavoyagerie.fr/prise-de-rendez-vous" },
    ],
    links: [{ rel: "canonical", href: "https://lavoyagerie.fr/prise-de-rendez-vous" }],
  }),
  component: RDV,
});

const SLOTS = ["09:30", "10:30", "11:30", "14:00", "15:00", "16:00", "16:30"];

const schema = z.object({
  full_name: z.string().trim().min(2, "Nom requis").max(120),
  email: z.string().trim().email("Email invalide").max(200),
  subject: z.string().trim().min(2, "Objet requis").max(200),
});

function RDV() {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [date, setDate] = useState<Date | undefined>();
  const [slot, setSlot] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!date || !slot) {
      toast.error("Choisissez une date et un créneau.");
      return;
    }
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      full_name: fd.get("full_name"),
      email: fd.get("email"),
      subject: fd.get("subject"),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Formulaire invalide");
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("appointments").insert({
      full_name: parsed.data.full_name,
      email: parsed.data.email,
      message: parsed.data.subject,
      appointment_date: format(date, "yyyy-MM-dd"),
      appointment_slot: slot,
      contact_mode: "phone",
    });
    setSubmitting(false);

    if (error) {
      toast.error("Une erreur est survenue. Merci de réessayer.");
      return;
    }
    setConfirmed(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="pt-28 pb-8 md:pt-40 md:pb-12 paper">
        <div className="mx-auto max-w-[1400px] px-5 md:px-12">
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-clay mb-4">
            ✦ Prise de rendez-vous
          </p>
          <h1 className="font-display text-[2.5rem] sm:text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight max-w-[18ch]">
            Parlons de votre
            <br />
            <em className="italic text-clay">prochain voyage.</em>
          </h1>
          <p className="mt-6 md:mt-10 max-w-2xl text-sm md:text-lg text-muted-foreground leading-relaxed">
            Choisissez le moment qui vous convient. Nous vous rappelons par téléphone
            ou en visio pour faire connaissance et imaginer ensemble votre itinéraire.
          </p>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-12 grid lg:grid-cols-12 gap-8 md:gap-12">
          <aside className="lg:col-span-4 space-y-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-clay mb-3">L'agence</p>
              <p className="font-display text-2xl leading-snug">
                13 A rue de la Ciotat
                <br />
                13260 Cassis
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-clay mb-3">Téléphone</p>
              <a href="tel:+33483432949" className="font-display text-2xl italic hover:text-clay transition">
                04 83 43 29 49
              </a>
              <p className="mt-2 text-sm text-muted-foreground">Du lundi au vendredi · 10h–19h</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-clay mb-3">Email</p>
              <a href="mailto:bonjour@lavoyagerie.fr" className="font-display text-2xl italic hover:text-clay transition">
                bonjour@lavoyagerie.fr
              </a>
            </div>
          </aside>

          <div className="lg:col-span-8 space-y-6">
            {confirmed ? (
              <div className="border border-border rounded-2xl p-10 md:p-16 bg-cream text-center">
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-ink text-cream">
                  <Check className="h-6 w-6" />
                </div>
                <h2 className="font-display text-3xl md:text-4xl mb-4">
                  Votre demande est <em className="italic text-clay">enregistrée.</em>
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Un conseiller vous confirmera très vite votre rendez-vous
                  {date ? (
                    <>
                      {" "}du{" "}
                      <span className="text-ink font-medium">
                        {format(date, "EEEE d MMMM", { locale: fr })}
                      </span>
                    </>
                  ) : null}
                  {slot ? (
                    <>
                      {" "}à <span className="text-ink font-medium">{slot}</span>
                    </>
                  ) : null}
                  .
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center mt-8 px-8 py-4 text-[11px] uppercase tracking-[0.3em] rounded-full bg-ink text-cream hover:bg-clay transition"
                >
                  Retour à l'accueil →
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="border border-border rounded-2xl p-6 md:p-10 paper">
                  <h2 className="font-display text-3xl md:text-4xl mb-6">
                    Choisir une <em className="italic text-clay">date.</em>
                  </h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(d) => { setDate(d); setSlot(null); }}
                        disabled={(d) => d < today || d.getDay() === 0 || d.getDay() === 6}
                        locale={fr}
                        className={cn("p-0 pointer-events-auto")}
                      />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-clay mb-4">
                        Créneaux disponibles
                      </p>
                      {!date ? (
                        <p className="text-sm text-muted-foreground">
                          Sélectionnez d'abord une date.
                        </p>
                      ) : (
                        <div className="grid grid-cols-3 gap-2">
                          {SLOTS.map((s) => {
                            const active = s === slot;
                            return (
                              <button
                                key={s}
                                type="button"
                                onClick={() => setSlot(s)}
                                className={cn(
                                  "py-2.5 text-sm font-display rounded-sm border transition",
                                  active
                                    ? "bg-ink text-cream border-ink"
                                    : "bg-background text-ink border-clay/25 hover:border-clay",
                                )}
                              >
                                {s}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border border-border rounded-2xl p-6 md:p-10 bg-cream space-y-6">
                  <h2 className="font-display text-3xl md:text-4xl">
                    Vos <em className="italic text-clay">coordonnées.</em>
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="full_name" className="text-[10px] uppercase tracking-[0.3em] text-clay">
                        Nom complet *
                      </Label>
                      <Input id="full_name" name="full_name" required maxLength={120} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[10px] uppercase tracking-[0.3em] text-clay">
                        Email *
                      </Label>
                      <Input id="email" name="email" type="email" required maxLength={200} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-[10px] uppercase tracking-[0.3em] text-clay">
                      Objet du rendez-vous *
                    </Label>
                    <Textarea id="subject" name="subject" rows={4} required maxLength={1000} placeholder="Quel est le projet que vous aimeriez évoquer ?" />
                  </div>

                  <div className="pt-2 border-t border-clay/15 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <p className="text-[12px] text-foreground/70">
                      {date && slot ? (
                        <>
                          <span className="text-ink font-medium">
                            {format(date, "EEEE d MMMM", { locale: fr })}
                          </span>{" "}
                          · {slot}
                        </>
                      ) : (
                        "Sélectionnez une date et un créneau."
                      )}
                    </p>
                    <button
                      type="submit"
                      disabled={submitting || !date || !slot}
                      className={cn(
                        "inline-flex items-center justify-center gap-2 px-8 py-4 text-[11px] uppercase tracking-[0.3em] rounded-full transition",
                        submitting || !date || !slot
                          ? "bg-clay/20 text-ink/40 cursor-not-allowed"
                          : "bg-ink text-cream hover:bg-clay",
                      )}
                    >
                      {submitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                      Confirmer la réservation →
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
