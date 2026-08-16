import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster?: string;
  className?: string;
};

export default function LaurenceVideo({ src, poster, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [cue, setCue] = useState("");

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const track = video.textTracks[0];
    if (!track) return;
    track.mode = "hidden";
    const onCue = () => {
      const active = track.activeCues?.[0] as VTTCue | undefined;
      setCue(active ? active.text : "");
    };
    track.addEventListener("cuechange", onCue);
    onCue();
    return () => track.removeEventListener("cuechange", onCue);
  }, []);

  const toggleSound = () => {
    const video = ref.current;
    if (!video) return;
    const next = !muted;
    video.muted = next;
    setMuted(next);
    if (!next) void video.play();
  };

  return (
    <div className="relative">
      <video
        ref={ref}
        src={src}
        poster={poster}
        autoPlay
        loop
        muted={muted}
        playsInline
        preload="metadata"
        crossOrigin="anonymous"
        aria-label="Laurence Palandjian, fondatrice de La Voyagerie, vous accueille"
        className={className ?? "w-full h-full object-cover object-top"}
      >
        <track
          kind="captions"
          srcLang="fr"
          label="Français"
          src="/captions/laurence-fr.vtt"
          default
        />
      </video>

      {cue ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-14 px-4 md:px-6">
          <p className="mx-auto max-w-[92%] bg-ink/70 text-cream text-center text-[13px] md:text-[15px] leading-snug px-3 py-2">
            {cue}
          </p>
        </div>
      ) : null}

      <button
        type="button"
        onClick={toggleSound}
        aria-label={muted ? "Activer le son" : "Couper le son"}
        className="absolute bottom-3 right-3 border border-cream/60 bg-ink/60 text-cream text-[10px] uppercase tracking-[0.25em] px-3 py-2 hover:bg-ink transition"
      >
        {muted ? "Son ▶" : "Son ✕"}
      </button>
    </div>
  );
}
