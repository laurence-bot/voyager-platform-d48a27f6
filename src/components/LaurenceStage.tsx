import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import laurenceVideoAsset from "@/assets/laurence-avatar.mp4.asset.json";


type Props = {
  /** Full speech text; also displayed progressively */
  speech?: string | null;
  /** Optional label shown above the bubble */
  label?: string;
  /** Fires when speech playback ends */
  onEnded?: () => void;
  /** Colors */
  ink: string;
  bg: string;
  green: string;
  greenSoft: string;
  line: string;
};

/**
 * Persistent Laurence character with:
 * - Full-body cut-out image
 * - Subtle breathing / sway micro-animation
 * - Soft "aura" that pulses while she is speaking
 * - Speech bubble revealing the text progressively synced to audio
 * - Play/mute toggle (user preference is persisted)
 */
export function LaurenceStage({
  speech,
  label,
  onEnded,
  ink,
  bg,
  green,
  greenSoft,
  line,
}: Props) {
  const [muted, setMuted] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem("laurence-muted") === "1";
  });
  const [revealed, setRevealed] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const currentSpeechRef = useRef<string | null>(null);

  // Persist mute preference
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("laurence-muted", muted ? "1" : "0");
    if (muted && audioRef.current) {
      audioRef.current.pause();
    }
  }, [muted]);

  // Trigger audio + progressive reveal when speech changes
  useEffect(() => {
    // Cleanup previous
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }
    setRevealed("");
    setSpeaking(false);
    currentSpeechRef.current = speech ?? null;

    if (!speech) return;

    let cancelled = false;
    const localSpeech = speech;

    const revealByTiming = (durationMs: number) => {
      const start = performance.now();
      const total = Math.max(1200, durationMs);
      const tick = (now: number) => {
        if (cancelled || currentSpeechRef.current !== localSpeech) return;
        const t = Math.min(1, (now - start) / total);
        const chars = Math.floor(localSpeech.length * t);
        setRevealed(localSpeech.slice(0, chars));
        if (t < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setRevealed(localSpeech);
          setSpeaking(false);
          onEnded?.();
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    const fallbackReveal = () => {
      // ~ 55ms per character reading pace
      revealByTiming(Math.max(1600, localSpeech.length * 55));
    };

    if (muted) {
      setSpeaking(true);
      fallbackReveal();
      return () => {
        cancelled = true;
      };
    }

    // Fetch audio
    setSpeaking(true);
    fetch("/api/public/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: localSpeech }),
    })
      .then(async (r) => {
        if (!r.ok) throw new Error("tts");
        const blob = await r.blob();
        if (cancelled || currentSpeechRef.current !== localSpeech) return;
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audioRef.current = audio;
        audio.addEventListener("loadedmetadata", () => {
          if (cancelled || currentSpeechRef.current !== localSpeech) return;
          revealByTiming((audio.duration || 6) * 1000);
        });
        audio.addEventListener("ended", () => {
          if (cancelled) return;
          setSpeaking(false);
          onEnded?.();
        });
        audio.addEventListener("error", () => {
          if (cancelled) return;
          fallbackReveal();
        });
        audio.play().catch(() => {
          // Autoplay blocked → still reveal text
          fallbackReveal();
        });
      })
      .catch(() => {
        if (!cancelled) fallbackReveal();
      });

    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speech]);

  return (
    <div className="relative w-full h-full flex items-end justify-center">
      {/* Aura */}
      <motion.div
        className="absolute inset-0 rounded-[2rem]"
        style={{
          background: `radial-gradient(circle at 50% 60%, ${greenSoft}22, transparent 65%)`,
        }}
        animate={{ opacity: speaking ? [0.55, 0.85, 0.55] : 0.35 }}
        transition={{
          duration: speaking ? 2.4 : 1.2,
          repeat: speaking ? Infinity : 0,
          ease: "easeInOut",
        }}
      />

      {/* Character video — loops muted for living avatar effect */}
      <div className="relative z-10 h-[70vh] max-h-[720px] w-auto overflow-hidden rounded-[1.5rem]">
        <video
          src={laurenceVideoAsset.url}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="h-full w-auto object-cover select-none pointer-events-none"
          style={{
            filter: "drop-shadow(0 30px 40px rgba(27,31,26,0.18))",
          }}
        />
      </div>


      {/* Speech bubble intentionally removed — audio only */}

      {/* Mute toggle */}
      <button
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? "Activer le son" : "Couper le son"}
        className="absolute bottom-3 right-3 z-30 h-10 w-10 grid place-items-center rounded-full backdrop-blur transition-all hover:scale-105"
        style={{
          background: "rgba(255,255,255,0.9)",
          border: `1px solid ${line}`,
          color: ink,
        }}
      >
        {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </button>

      {/* Bg color reference (unused vars silencer) */}
      <span className="hidden">{bg}</span>
    </div>
  );
}
