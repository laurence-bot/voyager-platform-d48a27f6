import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

type Props = {
  destinationName: string;
  triggerLabel?: string;
  triggerClassName?: string;
};

const SLOTS = ["09:30", "11:00", "14:30", "16:00", "17:30"];
const FR_DAYS = ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."];
const FR_MONTHS = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

function buildNextDays(count: number): Date[] {
  const days: Date[] = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  let i = 1;
  while (days.length < count) {
    const next = new Date(d);
    next.setDate(d.getDate() + i);
    const day = next.getDay();
    if (day !== 0 && day !== 6) days.push(next); // skip weekends
    i++;
  }
  return days;
}

export function AppointmentDialog({
  destinationName,
  triggerLabel = "Planifier un échange",
  triggerClassName,
}: Props) {
  const days = useMemo(() => buildNextDays(8), []);
  const [selectedDay, setSelectedDay] = useState<Date>(days[0]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className={
            triggerClassName ??
            "inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-cream/85 hover:text-ochre transition border-b border-cream/30 hover:border-ochre pb-1"
          }
        >
          <span className="text-ochre">✦</span> {triggerLabel}
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl bg-cream text-ink border border-clay/20 p-0 overflow-hidden">
        <div className="bg-ink text-cream px-8 py-7">
          <p className="text-[10px] uppercase tracking-[0.3em] text-ochre mb-3">
            ✦ Échange privé · {destinationName}
          </p>
          <h3 className="font-display text-2xl md:text-[1.65rem] leading-tight">
            Choisissez un créneau pour échanger
            <span className="block italic text-ochre">avec un expert de la destination.</span>
          </h3>
          <p className="mt-3 text-[13px] text-cream/75 leading-relaxed max-w-md">
            Trente minutes, par téléphone ou en visio — pour cerner votre projet et amorcer votre itinéraire.
          </p>
        </div>

        <div className="px-8 py-7 space-y-7 bg-cream max-h-[55vh] overflow-y-auto">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-clay mb-4">Choisir une date</p>
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
              {days.map((day) => {
                const isActive = day.toDateString() === selectedDay.toDateString();
                return (
                  <button
                    key={day.toISOString()}
                    type="button"
                    onClick={() => { setSelectedDay(day); setSelectedSlot(null); }}
                    className={
                      "flex-shrink-0 w-[68px] py-3 rounded-sm border text-center transition " +
                      (isActive
                        ? "bg-ink text-cream border-ink"
                        : "bg-background text-ink border-clay/25 hover:border-clay")
                    }
                  >
                    <span className="block text-[10px] uppercase tracking-[0.2em] opacity-70">
                      {FR_DAYS[day.getDay()]}
                    </span>
                    <span className="block font-display text-xl mt-1">{day.getDate()}</span>
                    <span className="block text-[9px] uppercase tracking-[0.18em] opacity-60 mt-0.5">
                      {FR_MONTHS[day.getMonth()].slice(0, 4)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-clay mb-4">Choisir un horaire</p>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {SLOTS.map((slot) => {
                const isActive = slot === selectedSlot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={
                      "py-2.5 text-sm font-display rounded-sm border transition " +
                      (isActive
                        ? "bg-ochre text-ink border-ochre"
                        : "bg-background text-ink border-clay/25 hover:border-clay")
                    }
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-clay/15 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-[12px] text-foreground/70 leading-relaxed">
              {selectedSlot ? (
                <>
                  <span className="text-ink font-medium">
                    {FR_DAYS[selectedDay.getDay()]} {selectedDay.getDate()} {FR_MONTHS[selectedDay.getMonth()]}
                  </span>{" "}
                  · {selectedSlot}
                </>
              ) : (
                <>Sélectionnez une date et un horaire pour confirmer.</>
              )}
            </p>
            <Link
              to="/prise-de-rendez-vous"
              className={
                "inline-flex items-center justify-center px-7 py-3 text-[11px] uppercase tracking-[0.3em] rounded-full transition " +
                (selectedSlot
                  ? "bg-ink text-cream hover:bg-clay"
                  : "bg-clay/20 text-ink/40 cursor-not-allowed pointer-events-none")
              }
            >
              Confirmer →
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
