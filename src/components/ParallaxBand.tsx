import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  alt: string;
  height?: string; // ex: "40vh"
};

/**
 * Bandeau pleine largeur avec un léger effet parallax au scroll.
 * Pas de texte, juste une respiration visuelle entre deux sections.
 */
export function ParallaxBand({ src, alt, height = "40vh" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handle = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Position relative au centre du viewport (-1 → +1 environ)
      const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
      // Décalage doux : ~12% de la hauteur du bandeau
      setOffset(progress * -40);
    };
    handle();
    window.addEventListener("scroll", handle, { passive: true });
    window.addEventListener("resize", handle);
    return () => {
      window.removeEventListener("scroll", handle);
      window.removeEventListener("resize", handle);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ height }}
      aria-hidden={false}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute inset-x-0 h-[130%] w-full object-cover will-change-transform"
        style={{ top: "-15%", objectPosition: "center 65%", transform: `translate3d(0, ${offset}px, 0)` }}
      />
    </div>
  );
}
