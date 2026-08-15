import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon, Check, Loader2 } from "lucide-react";
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

const TITLE = "Réserver un rendez-vous | La Voyagerie";
const DESC =
  "Réservez un échange privé avec un conseiller La Voyagerie : choisissez votre date, votre créneau et votre mode de contact.";

export const Route = createFileRoute("/reserver-rendez-vous")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "https://lavoyagerie.fr/reserver-rendez-vous" }],
  }),
  component: ReservationPage,
});

const SLOTS = ["09:30", "10:30", "11:30", "14:00", "15:00", "16:00", "17:00", "18:00"];

const schema = z.object({
  full_name: z.string().trim().min(2, "Nom requis").max(120),
  email: z.string().trim().email("Email invalide").max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  destination: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

function ReservationPage() {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [date, setDate] = useState<Date | undefined>();
  const [slot, setSlot] = useState<string | null>(null);
  const [contactMode, setContactMode] = useState<"phone" | "video" | "agence">("phone");
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
      phone: fd.get("phone"),
      destination: fd.get("destination"),
      message: fd.get("message"),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Formulaire invalide");
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("appointments").insert({
      full_name: parsed.data.full_name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      destination: parsed.data.destination || null,
      message: parsed.data.message || null,
      appointment_date: format(date, "yyyy-MM-dd"),
      appointment_slot: slot,
      contact_mode: contactMode,
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
            ✦ Réservation d'un échange
          </p>
          <h1 className="font-display text-[2.5rem] sm:text-5xl md:text-7xl leading-[0.95] tracking-tight max-w-[18ch]">
            Choisissez votre
            <br />
            <em className="italic text-clay">moment privilégié.</em>
          </h1>
          <p className="mt-6 md:mt-10 max-w-2xl text-sm md:text-lg text-muted-foreground leading-relaxed">
            Trente minutes pour cerner votre projet. Sélectionnez la date, l'heure
            et le mode de contact qui vous conviennent — nous vous confirmons votre
            créneau sous quelques heures.
          </p>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-[1400px] px-5 md:px-12">
          {confirmed ? (
            <div className="border border-border rounded-2xl p-10 md:p-16 bg-cream text-center max-w-2xl mx-auto">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-ink text-cream">
                <Check className="h-6 w-6" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl mb-4">
                Votre demande est <em className="italic text-clay">enregistrée.</em>
              </h2>
              <p className="text-muted-foreground">
                Un conseiller vous confirmera très vite votre rendez-vous
                {date ? (
                  <>
                    {" "}du <span className="text-ink font-medium">{format(date, "EEEE d MMMM", { locale: fr })}</span>
                  </>
                ) : null}
                {slot ? <> à <span className="text-ink font-medium">{slot}</span></> : null}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid lg:grid-cols-12 gap-8 md:gap-12">
              <div className="lg:col-span-5 space-y-8">
                <div className="border border-border rounded-2xl p-6 md:p-8 paper">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-clay mb-4 flex items-center gap-2">
                    <CalendarIcon className="h-3.5 w-3.5" /> Choisir une date
                  </p>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(d) => { setDate(d); setSlot(null); }}
                    disabled={(d) => d < today || d.getDay() === 0 || d.getDay() === 6}
                    locale={fr}
                    className={cn("p-0 pointer-events-auto")}
                  />
                </div>

                <div className="border border-border rounded-2xl p-6 md:p-8">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-clay mb-4">
                    Créneaux disponibles
                  </p>
                  {!date ? (
                    <p className="text-sm text-muted-foreground">
                      Sélectionnez d'abord une date.
                    </p>
                  ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
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

              <div className="lg:col-span-7 space-y-6">
                <div className="border border-border rounded-2xl p-6 md:p-10 bg-cream space-y-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-clay mb-4">
                      Mode d'échange
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "phone", label: "Téléphone" },
                        { id: "video", label: "Visio" },
                        { id: "agence", label: "À l'agence" },
                      ].map((opt) => {
                        const active = contactMode === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setContactMode(opt.id as typeof contactMode)}
                            className={cn(
                              "py-3 text-[11px] uppercase tracking-[0.25em] rounded-sm border transition",
                              active
                                ? "bg-ink text-cream border-ink"
                                : "bg-background text-ink border-clay/25 hover:border-clay",
                            )}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

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
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-[10px] uppercase tracking-[0.3em] text-clay">
                        Téléphone
                      </Label>
                      <Input id="phone" name="phone" type="tel" maxLength={40} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="destination" className="text-[10px] uppercase tracking-[0.3em] text-clay">
                        Destination envisagée
                      </Label>
                      <Input id="destination" name="destination" maxLength={120} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-[10px] uppercase tracking-[0.3em] text-clay">
                      Quelques mots sur votre projet
                    </Label>
                    <Textarea id="message" name="message" rows={4} maxLength={1000} />
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
              </div>
            </form>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
