import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { LaurenceStage } from "@/components/LaurenceStage";
import { ArrowRight, Send, Check } from "lucide-react";

const TITLE = "Le Savoir de Laurence — Démonstration | La Voyagerie";
const DESC =
  "Découvrez Le Savoir de Laurence, l'intelligence dédiée à la création de voyages sur mesure. Une expérience immersive pour comprendre notre méthode.";

export const Route = createFileRoute("/savoir-de-laurence")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "https://lavoyagerie.fr/savoir-de-laurence" }],
  }),
  component: SavoirDeLaurencePage,
});

const C = {
  bg: "#F6F2EA",
  bgSoft: "#EFE8DA",
  ink: "#1B1F1A",
  inkSoft: "#3A3F38",
  green: "#2E4A34",
  greenSoft: "#4A6A50",
  line: "rgba(27,31,26,0.12)",
};

type Message = { from: "ai" | "user"; text: string };

const questions = [
  "Qu'est-ce qui vous donne envie de partir en voyage en ce moment ?",
  "Quelles émotions aimeriez-vous ressentir pendant ce voyage ?",
  "Y a-t-il un moment particulier de votre vie qui donne du sens à ce projet ?",
  "Voyagez-vous plutôt pour explorer, vous reposer, ou vous reconnecter à quelqu'un ?",
];

const understandingStages = [
  { motivation: "en cours d'analyse", emotions: "—", moment: "—", level: 18 },
  { motivation: "découverte", emotions: "émerveillement", moment: "en cours d'analyse", level: 42 },
  { motivation: "découverte, transmission", emotions: "émerveillement, sérénité", moment: "tournant personnel", level: 71 },
  { motivation: "découverte, transmission", emotions: "émerveillement, sérénité, lenteur", moment: "célébration d'une étape", level: 94 },
];

const finalInsights = [
  { label: "Moment de vie", value: "Une étape à célébrer, en couple." },
  { label: "Motivation", value: "Découvrir sans être bousculé." },
  { label: "Émotions recherchées", value: "Émerveillement, sérénité, lenteur." },
  { label: "Profil", value: "Voyageurs curieux, sensibles à l'esthétique." },
  { label: "Peurs", value: "Les circuits trop denses, l'artificiel." },
  { label: "Style de voyage", value: "Sur mesure, rythme lent, lieux confidentiels." },
];

// Speech dialogues per phase
const speeches = {
  intro:
    "Bonjour. Je suis Laurence. Depuis plus de vingt ans, je crée des voyages sur mesure. J'ai transmis ma méthode à une intelligence, non pour me remplacer, mais pour mieux vous comprendre avant que je commence à imaginer votre voyage.",
  chatIntro:
    "Prenez votre temps. Il n'y a pas de bonne réponse. Ce sont vos mots, vos hésitations, vos silences qui vont me guider.",
  synthesis:
    "Voici ce que j'ai perçu de vous. Ce n'est pas encore votre voyage, c'est votre manière de voyager.",
  transition:
    "Merci. Maintenant je comprends déjà beaucoup mieux votre manière de voyager. Ce travail aurait normalement nécessité près d'une heure d'échange. Grâce au Savoir de Laurence, je peux désormais consacrer mon énergie à imaginer votre voyage plutôt qu'à recueillir des informations. Si vous souhaitez aller plus loin, j'ai encore besoin de quelques informations pratiques.",
  finale:
    "Un voyage sur mesure ne commence pas par une destination. Il commence par une personne. Merci de m'avoir laissé découvrir la vôtre.",
};

type Phase = 1 | 2 | 3 | 4 | 5 | 6;

function SavoirDeLaurencePage() {
  const [phase, setPhase] = useState<Phase>(1);
  const [currentSpeech, setCurrentSpeech] = useState<string | null>(speeches.intro);
  const [speechLabel, setSpeechLabel] = useState<string>("Laurence");

  const goTo = (p: Phase, speech: string | null, label = "Laurence") => {
    setPhase(p);
    setCurrentSpeech(speech);
    setSpeechLabel(label);
  };

  return (
    <div className="min-h-screen" style={{ background: C.bg, color: C.ink }}>
      <SiteHeader />

      <main className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="mx-auto max-w-[1280px] px-4 md:px-8">
          {/* Progress */}
          <div className="flex justify-center gap-2 mb-10">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="h-[3px] rounded-full transition-all duration-700"
                style={{
                  width: phase === n ? 40 : 16,
                  background: phase >= n ? C.green : C.line,
                }}
              />
            ))}
          </div>

          <div className="grid md:grid-cols-[minmax(280px,420px)_1fr] gap-6 md:gap-14 items-stretch">
            {/* Laurence permanente */}
            <div className="md:sticky md:top-28 self-start h-[70vh] max-h-[720px]">
              <LaurenceStage
                speech={currentSpeech}
                label={speechLabel}
                ink={C.ink}
                bg={C.bg}
                green={C.green}
                greenSoft={C.greenSoft}
                line={C.line}
              />
            </div>

            {/* Contenu dynamique */}
            <div className="min-h-[560px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {phase === 1 && (
                  <Phase1
                    key="p1"
                    onNext={() => goTo(2, speeches.chatIntro, "Laurence")}
                  />
                )}
                {phase === 2 && (
                  <Phase2
                    key="p2"
                    setSpeech={(s, l) => {
                      setCurrentSpeech(s);
                      setSpeechLabel(l ?? "Laurence");
                    }}
                    onDone={() => goTo(3, speeches.synthesis, "Laurence")}
                  />
                )}
                {phase === 3 && (
                  <Phase3
                    key="p3"
                    onNext={() => goTo(4, speeches.transition, "Laurence")}
                  />
                )}
                {phase === 4 && (
                  <Phase4
                    key="p4"
                    onNext={() => goTo(5, "Commençons doucement. Comment vous appelez-vous ?", "Laurence")}
                  />
                )}
                {phase === 5 && (
                  <Phase5
                    key="p5"
                    setSpeech={(s, l) => {
                      setCurrentSpeech(s);
                      setSpeechLabel(l ?? "Laurence");
                    }}
                    onDone={() => goTo(6, speeches.finale, "Laurence")}
                  />
                )}
                {phase === 6 && <Phase6 key="p6" />}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

/* ---------------- PHASE 1 : Introduction ---------------- */
function Phase1({ onNext }: { onNext: () => void }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="text-[11px] uppercase tracking-[0.35em] mb-6" style={{ color: C.greenSoft }}>
        Une expérience La Voyagerie
      </div>
      <h1
        className="font-serif text-4xl md:text-6xl leading-[1.05] tracking-tight mb-8"
        style={{ color: C.ink }}
      >
        Rencontrez<br />Laurence.
      </h1>
      <div className="space-y-5 text-[17px] leading-relaxed max-w-[520px]" style={{ color: C.inkSoft }}>
        <p>
          Elle vous accompagnera tout au long de cette expérience. Prenez le temps de l'écouter, de répondre,
          de vous laisser guider.
        </p>
        <p>
          Vous pouvez lire, écouter, ou couper le son à tout moment.
        </p>
      </div>
      <button
        onClick={onNext}
        className="mt-10 group inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm tracking-wide transition-all duration-300 hover:opacity-90"
        style={{ background: C.ink, color: C.bg }}
      >
        Commencer
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </motion.section>
  );
}

/* ---------------- PHASE 2 : Conversation ---------------- */
function Phase2({
  setSpeech,
  onDone,
}: {
  setSpeech: (s: string | null, label?: string) => void;
  onDone: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([{ from: "ai", text: questions[0] }]);
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [stage, setStage] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const initRef = useRef(false);

  // First question spoken by Le Savoir
  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;
    setSpeech(questions[0], "Le Savoir de Laurence");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  const send = () => {
    const text = input.trim() || "…";
    setInput("");
    const nextMessages: Message[] = [...messages, { from: "user", text }];
    setMessages(nextMessages);
    setThinking(true);
    setSpeech(null);

    setTimeout(() => {
      setStage((s) => Math.min(s + 1, understandingStages.length - 1));
      const nextStep = step + 1;
      if (nextStep < questions.length) {
        setMessages([...nextMessages, { from: "ai", text: questions[nextStep] }]);
        setStep(nextStep);
        setThinking(false);
        setSpeech(questions[nextStep], "Le Savoir de Laurence");
      } else {
        const closing = "Merci. Je rassemble à présent tout ce que j'ai compris de vous.";
        setMessages([...nextMessages, { from: "ai", text: closing }]);
        setThinking(false);
        setSpeech(closing, "Laurence");
        setTimeout(onDone, 3200);
      }
    }, 1400);
  };

  const current = understandingStages[stage];

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="grid gap-6"
    >
      <div
        className="rounded-2xl flex flex-col overflow-hidden"
        style={{ background: "#fff", border: `1px solid ${C.line}`, minHeight: 420 }}
      >
        <div className="flex items-center justify-between px-6 py-3" style={{ borderBottom: `1px solid ${C.line}` }}>
          <div className="text-[11px] uppercase tracking-[0.25em]" style={{ color: C.greenSoft }}>
            Conversation
          </div>
          <div className="text-[11px]" style={{ color: C.inkSoft }}>
            Compréhension&nbsp;
            <span style={{ color: C.ink }}>{current.level}%</span>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-6 space-y-3 max-h-[420px]">
          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className="max-w-[85%] rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed"
                  style={
                    m.from === "user"
                      ? { background: C.ink, color: C.bg }
                      : { background: C.bgSoft, color: C.ink }
                  }
                >
                  {m.text}
                </div>
              </motion.div>
            ))}
            {thinking && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-start">
                <div className="rounded-2xl px-4 py-2.5 flex gap-1.5" style={{ background: C.bgSoft }}>
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: C.green }}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="px-4 pb-4">
          <div className="flex items-center gap-2 rounded-full px-2 py-2" style={{ background: C.bg, border: `1px solid ${C.line}` }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !thinking && send()}
              placeholder="Répondez librement…"
              className="flex-1 bg-transparent px-4 py-2 text-[14px] outline-none placeholder:opacity-50"
              style={{ color: C.ink }}
              disabled={thinking}
            />
            <button
              onClick={send}
              disabled={thinking}
              className="h-9 w-9 grid place-items-center rounded-full transition-all disabled:opacity-40"
              style={{ background: C.green, color: C.bg }}
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl p-5 grid grid-cols-3 gap-4" style={{ background: C.bgSoft, border: `1px solid ${C.line}` }}>
        <MiniInsight label="Motivation" value={current.motivation} />
        <MiniInsight label="Émotions" value={current.emotions} />
        <MiniInsight label="Moment de vie" value={current.moment} />
      </div>
    </motion.section>
  );
}

function MiniInsight({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[9px] uppercase tracking-[0.3em] mb-1" style={{ color: C.greenSoft }}>{label}</div>
      <motion.div
        key={value}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-[13px]"
        style={{ color: C.ink }}
      >
        {value}
      </motion.div>
    </div>
  );
}

/* ---------------- PHASE 3 : Ce que j'ai compris ---------------- */
function Phase3({ onNext }: { onNext: () => void }) {
  const nodes = useMemo(
    () =>
      finalInsights.map((_, i) => {
        const angle = (i / finalInsights.length) * Math.PI * 2 - Math.PI / 2;
        return { x: 50 + Math.cos(angle) * 34, y: 50 + Math.sin(angle) * 34 };
      }),
    [],
  );

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-[11px] uppercase tracking-[0.35em] mb-4" style={{ color: C.greenSoft }}>Synthèse</div>
      <h2 className="font-serif text-3xl md:text-5xl leading-[1.1] tracking-tight mb-8" style={{ color: C.ink }}>
        Ce que j'ai compris.
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 mb-10">
        {finalInsights.map((it, i) => (
          <motion.div
            key={it.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
          >
            <div className="text-[10px] uppercase tracking-[0.3em] mb-1" style={{ color: C.greenSoft }}>{it.label}</div>
            <div className="text-[14px] leading-snug" style={{ color: C.ink }}>{it.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Small constellation */}
      <div className="relative w-full max-w-[240px] h-[160px] mb-8 opacity-60">
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
          {nodes.map((n, i) =>
            nodes.slice(i + 1).map((m, j) => (
              <line
                key={`${i}-${j}`}
                x1={n.x} y1={n.y} x2={m.x} y2={m.y}
                stroke={C.green} strokeWidth="0.15" strokeOpacity="0.4"
              />
            )),
          )}
        </svg>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={onNext}
        className="group inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm tracking-wide transition-all hover:opacity-90"
        style={{ background: C.ink, color: C.bg }}
      >
        Continuer avec Laurence
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </motion.button>
    </motion.section>
  );
}

/* ---------------- PHASE 4 : Transition émotionnelle ---------------- */
function Phase4({ onNext }: { onNext: () => void }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.7 }}
      className="max-w-[520px]"
    >
      <div className="text-[11px] uppercase tracking-[0.35em] mb-6" style={{ color: C.greenSoft }}>
        Un instant
      </div>
      <h2 className="font-serif text-3xl md:text-5xl leading-[1.15] tracking-tight mb-8" style={{ color: C.ink }}>
        Laurence vous parle.
      </h2>
      <p className="text-[16px] leading-relaxed mb-10" style={{ color: C.inkSoft }}>
        Écoutez, ou lisez à votre rythme. Elle prendra ensuite quelques informations pratiques pour préparer votre projet.
      </p>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4 }}
        onClick={onNext}
        className="group inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm tracking-wide transition-all hover:opacity-90"
        style={{ background: C.green, color: C.bg }}
      >
        Je suis prêt·e
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </motion.button>
    </motion.section>
  );
}

/* ---------------- PHASE 5 : Formulaire progressif ---------------- */
type FormField = {
  key: string;
  label: string;
  placeholder: string;
  speech: string;
  type?: "text" | "email" | "tel";
};

const formFields: FormField[] = [
  {
    key: "name",
    label: "Votre prénom",
    placeholder: "Prénom…",
    speech: "Commençons doucement. Comment vous appelez-vous ?",
  },
  {
    key: "email",
    label: "Votre email",
    placeholder: "vous@exemple.fr",
    type: "email",
    speech: "Merci. Où puis-je vous écrire ? Je vous répondrai personnellement.",
  },
  {
    key: "period",
    label: "Quand souhaitez-vous partir ?",
    placeholder: "Ex. printemps 2027, entre mars et mai…",
    speech: "Une période, même approximative, m'aide à imaginer la lumière, la saison, le rythme du voyage.",
  },
  {
    key: "travelers",
    label: "Combien serez-vous ?",
    placeholder: "Ex. deux adultes",
    speech: "Cette information change tout. Un voyage à deux ne se conçoit pas comme un voyage en famille.",
  },
  {
    key: "budget",
    label: "Une idée de budget par personne ?",
    placeholder: "Ex. entre 4 000 et 6 000 €",
    speech: "Je ne juge jamais un budget. Je m'en sers pour vous proposer ce qui est réellement possible, sans compromis inutile.",
  },
];

function Phase5({
  setSpeech,
  onDone,
}: {
  setSpeech: (s: string | null, label?: string) => void;
  onDone: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({});
  const [current, setCurrent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (index < formFields.length) {
      setSpeech(formFields[index].speech, "Laurence");
      setCurrent(values[formFields[index].key] ?? "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const next = () => {
    if (!current.trim()) return;
    const field = formFields[index];
    const nextValues = { ...values, [field.key]: current.trim() };
    setValues(nextValues);
    if (index + 1 < formFields.length) {
      setIndex(index + 1);
    } else {
      setSubmitting(true);
      setSpeech("Merci infiniment. Je prends le relais.", "Laurence");
      setTimeout(onDone, 2600);
    }
  };

  const field = formFields[index];
  const progress = Math.round(((index) / formFields.length) * 100);

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.6 }}
      className="max-w-[520px]"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="text-[11px] uppercase tracking-[0.35em]" style={{ color: C.greenSoft }}>
          Question {index + 1} sur {formFields.length}
        </div>
        <div className="text-[11px]" style={{ color: C.inkSoft }}>{progress}%</div>
      </div>

      <div className="h-[2px] w-full rounded-full mb-10 overflow-hidden" style={{ background: C.line }}>
        <motion.div
          className="h-full"
          style={{ background: C.green }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={field.key}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-serif text-2xl md:text-4xl leading-tight tracking-tight mb-8" style={{ color: C.ink }}>
            {field.label}
          </h2>
          <input
            autoFocus
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && next()}
            placeholder={field.placeholder}
            type={field.type ?? "text"}
            disabled={submitting}
            className="w-full bg-transparent px-0 py-3 text-[20px] outline-none placeholder:opacity-40 border-b transition-colors"
            style={{ color: C.ink, borderColor: C.line }}
          />
          <button
            onClick={next}
            disabled={!current.trim() || submitting}
            className="mt-10 group inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm tracking-wide transition-all hover:opacity-90 disabled:opacity-40"
            style={{ background: C.ink, color: C.bg }}
          >
            {index + 1 < formFields.length ? "Continuer" : "Terminer"}
            {index + 1 < formFields.length ? (
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            ) : (
              <Check className="h-4 w-4" />
            )}
          </button>
        </motion.div>
      </AnimatePresence>
    </motion.section>
  );
}

/* ---------------- PHASE 6 : Phrase mémorable ---------------- */
function Phase6() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="max-w-[560px]"
    >
      <div className="text-[11px] uppercase tracking-[0.35em] mb-8" style={{ color: C.greenSoft }}>
        Laurence
      </div>
      <blockquote
        className="font-serif text-2xl md:text-[38px] leading-[1.25] tracking-tight mb-12"
        style={{ color: C.ink }}
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="block"
        >
          «&nbsp;Un voyage sur mesure ne commence pas par une destination.
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="block mt-3"
          style={{ color: C.green }}
        >
          Il commence par une personne.
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.2 }}
          className="block mt-3 italic"
          style={{ color: C.inkSoft }}
        >
          Merci de m'avoir laissé découvrir la vôtre.&nbsp;»
        </motion.span>
      </blockquote>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5, duration: 0.8 }}
      >
        <Link
          to="/demande-de-devis"
          className="group inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm tracking-wide transition-all hover:opacity-90"
          style={{ background: C.green, color: C.bg }}
        >
          Confier mon projet à Laurence
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </motion.section>
  );
}
