import { useMemo, useState, useId } from "react";

/**
 * Carte de la Namibie — silhouette géographique RÉELLE.
 * Path SVG dérivé du dataset GeoJSON public (Natural Earth / datasets/geo-countries),
 * simplifié (Douglas-Peucker) et projeté en équirectangulaire ajusté.
 * ViewBox : 1000 × 1200.
 */

type StopKey = "windhoek" | "sossusvlei" | "swakopmund" | "damaraland" | "etosha" | "waterberg";

const STOPS: {
  key: StopKey;
  label: string;
  hint: string;
  x: number;
  y: number;
  align: "left" | "right";
}[] = [
  { key: "etosha",     label: "Etosha",     hint: "Parc national · safari",         x: 381, y: 339, align: "right" },
  { key: "damaraland", label: "Damaraland", hint: "Massifs rouges · rhinos noirs",  x: 269, y: 445, align: "right" },
  { key: "waterberg",  label: "Waterberg",  hint: "Plateau · retour Windhoek",      x: 427, y: 441, align: "right" },
  { key: "swakopmund", label: "Swakopmund", hint: "Côte Atlantique · Walvis Bay",   x: 261, y: 582, align: "left"  },
  { key: "windhoek",   label: "Windhoek",   hint: "Capitale · point de départ",     x: 417, y: 575, align: "right" },
  { key: "sossusvlei", label: "Sossusvlei", hint: "Dunes du désert du Namib",       x: 335, y: 719, align: "right" },
];

// Ordre logique du circuit (1 → 6)
const ROUTE_ORDER: StopKey[] = ["windhoek", "sossusvlei", "swakopmund", "damaraland", "etosha", "waterberg"];

function matchStop(region?: string): StopKey | null {
  if (!region) return null;
  const r = region.toLowerCase();
  if (r.includes("windhoek")) return "windhoek";
  if (r.includes("sossusvlei") || r.includes("sesriem") || r.includes("namib")) return "sossusvlei";
  if (r.includes("swakopmund") || r.includes("walvis") || r.includes("côte")) return "swakopmund";
  if (r.includes("damaraland") || r.includes("erongo") || r.includes("kaoko") || r.includes("kunene")) return "damaraland";
  if (r.includes("etosha")) return "etosha";
  if (r.includes("waterberg") || r.includes("otjiwarongo")) return "waterberg";
  return null;
}

type Props = {
  steps: { day: string; region?: string; title?: string }[];
  activeIndex: number;
  onStepClick?: (index: number) => void;
};

// Vrai contour géographique de la Namibie (simplifié à 150 points)
const NAMIBIA_PATH = "M 380.5 971.8 L 378.0 974.2 L 372.0 970.7 L 335.5 935.5 L 307.9 889.1 L 303.9 864.2 L 299.6 861.0 L 295.0 847.6 L 296.4 843.5 L 298.2 843.1 L 298.8 846.3 L 300.2 840.8 L 296.4 829.5 L 287.9 823.8 L 286.3 811.4 L 288.7 805.5 L 284.3 796.1 L 285.0 791.4 L 280.2 785.2 L 282.6 771.2 L 277.9 752.9 L 281.0 739.8 L 276.6 722.5 L 265.7 706.6 L 266.4 698.9 L 257.0 675.9 L 256.6 668.7 L 260.4 662.3 L 259.2 641.6 L 255.5 630.8 L 258.3 626.1 L 258.9 627.8 L 259.0 623.7 L 254.0 601.4 L 255.6 595.4 L 257.0 603.0 L 261.3 596.7 L 260.0 573.4 L 246.8 546.1 L 226.2 522.9 L 226.8 518.3 L 218.8 501.3 L 192.4 461.1 L 179.0 417.5 L 170.5 408.9 L 168.5 400.7 L 141.9 345.6 L 135.9 338.7 L 134.7 332.5 L 124.8 318.9 L 109.3 306.1 L 107.3 296.7 L 98.1 282.2 L 94.9 269.8 L 90.1 242.7 L 92.4 224.2 L 112.7 215.8 L 117.7 216.5 L 122.1 221.5 L 132.8 220.1 L 141.8 222.1 L 157.1 213.5 L 161.3 208.6 L 178.3 203.4 L 184.5 205.6 L 190.3 204.2 L 197.4 207.3 L 199.9 214.7 L 227.9 234.6 L 241.1 233.9 L 241.7 232.3 L 500.2 232.4 L 511.7 248.8 L 519.0 256.0 L 526.8 259.5 L 548.5 259.8 L 559.1 263.4 L 574.4 262.3 L 580.4 265.5 L 581.8 263.6 L 596.5 265.8 L 614.8 263.1 L 628.8 271.7 L 639.3 272.3 L 643.5 274.8 L 665.1 268.1 L 678.8 273.7 L 851.3 238.3 L 861.6 237.8 L 872.7 241.9 L 879.6 239.2 L 901.0 245.0 L 904.8 251.4 L 914.6 259.1 L 908.2 258.3 L 902.2 261.3 L 895.9 258.7 L 882.4 265.6 L 872.3 276.2 L 868.7 276.7 L 863.6 269.8 L 859.2 269.8 L 855.9 274.5 L 851.2 273.6 L 832.8 286.0 L 820.6 300.4 L 814.1 304.3 L 807.5 288.4 L 801.1 285.4 L 794.8 272.7 L 775.9 274.1 L 684.2 292.5 L 653.7 293.8 L 654.3 534.8 L 653.5 537.2 L 593.0 537.2 L 593.3 961.8 L 568.1 969.0 L 561.2 980.5 L 549.7 983.0 L 548.4 986.3 L 551.0 992.3 L 540.8 997.2 L 533.9 995.1 L 530.7 991.2 L 518.0 989.4 L 482.7 993.5 L 467.3 985.5 L 450.0 984.4 L 447.2 978.9 L 436.3 980.4 L 437.3 973.1 L 431.5 965.0 L 436.1 960.0 L 432.8 948.9 L 424.7 949.2 L 422.7 940.5 L 416.4 935.7 L 405.2 939.3 L 404.8 944.6 L 401.8 945.0 L 403.0 947.5 L 400.2 948.6 L 401.0 951.4 L 397.6 951.4 L 399.8 958.1 L 395.9 965.7 L 393.7 966.6 L 391.8 964.3 L 380.5 971.8 Z";

export function NamibiaMap({ steps, activeIndex, onStepClick }: Props) {
  const [hoverKey, setHoverKey] = useState<StopKey | null>(null);
  const titleId = useId();

  const activeKey = useMemo(() => matchStop(steps[activeIndex]?.region), [steps, activeIndex]);

  const firstStepIndexByKey = useMemo(() => {
    const map = new Map<StopKey, number>();
    steps.forEach((s, i) => {
      const k = matchStop(s.region);
      if (k && !map.has(k)) map.set(k, i);
    });
    return map;
  }, [steps]);

  // Numéros de jours regroupés par étape (ex. Sossusvlei → "3-4")
  const daysLabelByKey = useMemo(() => {
    const map = new Map<StopKey, string>();
    const grouped = new Map<StopKey, number[]>();
    steps.forEach((s) => {
      const k = matchStop(s.region);
      if (!k) return;
      const m = /(\d+)/.exec(s.day ?? "");
      if (!m) return;
      const n = parseInt(m[1], 10);
      const arr = grouped.get(k) ?? [];
      if (!arr.includes(n)) arr.push(n);
      grouped.set(k, arr);
    });
    grouped.forEach((nums, k) => {
      nums.sort((a, b) => a - b);
      const isRange = nums.length > 1 && nums[nums.length - 1] - nums[0] === nums.length - 1;
      map.set(k, isRange ? `${nums[0]}-${nums[nums.length - 1]}` : nums.join("·"));
    });
    return map;
  }, [steps]);

  const SAND_FILL = "#E8DCC8";
  const SAND_STROKE = "#B89968";
  const DESERT_RED = "#D9A87C";
  const TERRA = "#B85C38";
  const CREAM = "#F5F0E8";
  const BROWN = "#5C3D1E";
  const LABEL = "#8A7050";
  const OCEAN = "#D8E3E5";

  const hoverStop = hoverKey ? STOPS.find((s) => s.key === hoverKey) ?? null : null;

  return (
    <div className="w-full">
      <span id={titleId} className="sr-only">
        Carte de la Namibie avec les six étapes de l'itinéraire : Windhoek, Sossusvlei, Swakopmund, Damaraland, Etosha, Waterberg.
      </span>

      <svg
        viewBox="0 0 1000 1200"
        className="w-full h-auto block select-none"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-labelledby={titleId}
        focusable="false"
      >
        <defs>
          <linearGradient id="sandGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#EFE2CE" />
            <stop offset="60%" stopColor={SAND_FILL} />
            <stop offset="100%" stopColor="#DDC8A8" />
          </linearGradient>
          <radialGradient id="namibRed" cx="20%" cy="75%" r="45%">
            <stop offset="0%" stopColor={DESERT_RED} stopOpacity="0.55" />
            <stop offset="100%" stopColor={DESERT_RED} stopOpacity="0" />
          </radialGradient>
          <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
            <feOffset dx="0" dy="4" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.18" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <clipPath id="namibClip">
            <path d={NAMIBIA_PATH} />
          </clipPath>
        </defs>

        {/* Fond océan subtil côté ouest */}
        <rect x="0" y="0" width="220" height="1200" fill={OCEAN} opacity="0.35" />

        {/* Atlantique */}
        <text
          x="55" y="600"
          fontSize="22"
          fill={TERRA}
          opacity="0.7"
          fontFamily="ui-serif, Georgia, serif"
          fontStyle="italic"
          transform="rotate(-90 55 600)"
        >
          Océan Atlantique
        </text>

        {/* Pays voisins */}
        <text x="500" y="190" fontSize="13" fill={LABEL} opacity="0.7"
              fontFamily="ui-serif, Georgia, serif" letterSpacing="4" textAnchor="middle">
          ANGOLA · ZAMBIE
        </text>
        <text x="950" y="600" fontSize="13" fill={LABEL} opacity="0.7"
              fontFamily="ui-serif, Georgia, serif" letterSpacing="4" textAnchor="middle"
              transform="rotate(90 950 600)">
          BOTSWANA
        </text>
        <text x="500" y="1030" fontSize="13" fill={LABEL} opacity="0.7"
              fontFamily="ui-serif, Georgia, serif" letterSpacing="4" textAnchor="middle">
          AFRIQUE DU SUD
        </text>

        {/* Silhouette Namibie */}
        <path
          d={NAMIBIA_PATH}
          fill="url(#sandGradient)"
          stroke={SAND_STROKE}
          strokeWidth="2"
          strokeLinejoin="round"
          filter="url(#softShadow)"
        />

        {/* Overlay rouge Namib (sud-ouest) */}
        <rect x="0" y="0" width="1000" height="1200" fill="url(#namibRed)" clipPath="url(#namibClip)" />

        {/* Subdivisions régionales internes (lignes douces, comme une carte administrative) */}
        <g clipPath="url(#namibClip)" stroke={SAND_STROKE} strokeWidth="1.2" fill="none" opacity="0.45">
          {/* nord : séparation Kaokoland / Ovamboland / Caprivi */}
          <path d="M 270 380 Q 380 360 500 380 Q 620 395 800 380" />
          {/* centre nord : séparation région d'Etosha / Otjozondjupa */}
          <path d="M 240 500 Q 380 510 540 510 Q 640 510 654 510" />
          {/* axe Damaraland / Erongo vertical */}
          <path d="M 320 410 Q 340 530 360 640" />
          {/* séparation Khomas/Hardap (sud du Windhoek) */}
          <path d="M 240 700 Q 400 710 540 705 Q 600 705 654 700" />
          {/* axe ouest-est milieu sud (Hardap) */}
          <path d="M 270 820 Q 400 830 540 830 Q 580 832 593 832" />
          {/* axe sud Karas */}
          <path d="M 280 920 Q 420 935 540 940 Q 580 942 593 940" />
          {/* méridien Khomas / Omaheke */}
          <path d="M 480 510 Q 490 650 500 800 Q 510 900 510 970" />
        </g>

        {/* Régions / zones géographiques nommées */}
        <text x="320" y="280" fontSize="12" fill={LABEL} opacity="0.85"
              fontFamily="ui-serif, Georgia, serif" letterSpacing="4">
          KAOKOLAND
        </text>
        <text x="780" y="265" fontSize="11" fill={LABEL} opacity="0.85"
              fontFamily="ui-serif, Georgia, serif" letterSpacing="3" textAnchor="middle">
          BANDE DE CAPRIVI
        </text>
        <text x="225" y="500" fontSize="12" fill={LABEL} opacity="0.85"
              fontFamily="ui-serif, Georgia, serif" letterSpacing="4">
          SKELETON
        </text>
        <text x="225" y="518" fontSize="12" fill={LABEL} opacity="0.85"
              fontFamily="ui-serif, Georgia, serif" letterSpacing="4">
          COAST
        </text>
        <text x="320" y="800" fontSize="12" fill={LABEL} opacity="0.85"
              fontFamily="ui-serif, Georgia, serif" letterSpacing="4">
          DÉSERT DU NAMIB
        </text>
        <text x="600" y="700" fontSize="12" fill={LABEL} opacity="0.85"
              fontFamily="ui-serif, Georgia, serif" letterSpacing="4" textAnchor="middle">
          KALAHARI
        </text>
        <text x="450" y="950" fontSize="11" fill={LABEL} opacity="0.85"
              fontFamily="ui-serif, Georgia, serif" letterSpacing="3" textAnchor="middle">
          FISH RIVER CANYON
        </text>

        {/* Tracé itinéraire 1 → 6 */}
        <polyline
          points={ROUTE_ORDER.map((k) => {
            const s = STOPS.find((st) => st.key === k)!;
            return `${s.x},${s.y}`;
          }).join(" ")}
          fill="none"
          stroke={TERRA}
          strokeWidth="2.5"
          strokeDasharray="7 7"
          opacity="0.85"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Étapes — pastilles numérotées cliquables */}
        {STOPS.map((s) => {
          const isActive = activeKey === s.key;
          const isHover = hoverKey === s.key;
          const radius = isActive ? 22 : isHover ? 19 : 16;
          const stepIdx = firstStepIndexByKey.get(s.key);
          const clickable = onStepClick && typeof stepIdx === "number";
          const dayLabel = daysLabelByKey.get(s.key) ?? "";
          const dayFontSize = dayLabel.length > 2 ? 12 : 14;

          const handleActivate = () => {
            if (clickable) onStepClick!(stepIdx!);
          };

          const labelOffset = s.align === "left" ? -(radius + 12) : (radius + 12);
          const labelAnchor = s.align === "left" ? "end" : "start";

          return (
            <g
              key={s.key}
              style={{ transition: "all 0.3s ease", cursor: clickable ? "pointer" : "default" }}
              onMouseEnter={() => setHoverKey(s.key)}
              onMouseLeave={() => setHoverKey((k) => (k === s.key ? null : k))}
              onFocus={() => setHoverKey(s.key)}
              onBlur={() => setHoverKey((k) => (k === s.key ? null : k))}
              onClick={handleActivate}
              onKeyDown={(e) => {
                if (clickable && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  handleActivate();
                }
              }}
              tabIndex={clickable ? 0 : -1}
              role={clickable ? "button" : "img"}
              aria-label={`Étape ${dayLabel} : ${s.label}. ${s.hint}`}
            >
              {isActive && (
                <>
                  <circle cx={s.x} cy={s.y} r="40" fill={TERRA} opacity="0.15">
                    <animate attributeName="r" values="32;48;32" dur="2.4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.22;0.06;0.22" dur="2.4s" repeatCount="indefinite" />
                  </circle>
                  <circle cx={s.x} cy={s.y} r="28" fill={TERRA} opacity="0.25" />
                </>
              )}
              <circle
                cx={s.x}
                cy={s.y}
                r={radius}
                fill={TERRA}
                stroke={CREAM}
                strokeWidth="3"
                style={{ transition: "r 0.3s ease" }}
              />
              <text
                x={s.x}
                y={s.y + 5}
                fontSize={dayFontSize}
                textAnchor="middle"
                fill="#ffffff"
                fontFamily="ui-serif, Georgia, serif"
                fontWeight="700"
                pointerEvents="none"
              >
                {dayLabel}
              </text>
              <text
                x={s.x + labelOffset}
                y={s.y + 6}
                fontSize="18"
                textAnchor={labelAnchor}
                fill={isActive ? TERRA : BROWN}
                fontFamily="ui-serif, Georgia, serif"
                fontWeight={isActive ? 700 : 500}
                pointerEvents="none"
              >
                {s.label}
              </text>
            </g>
          );
        })}

        {/* Tooltip au survol */}
        {hoverStop && (() => {
          const tw = Math.max(200, hoverStop.hint.length * 8);
          let tx = hoverStop.x - tw / 2;
          tx = Math.max(20, Math.min(tx, 1000 - tw - 20));
          const ty = hoverStop.y - 90;
          return (
            <g pointerEvents="none" style={{ transition: "opacity 0.2s ease" }}>
              <rect x={tx} y={ty} width={tw} height="62" rx="6" fill={BROWN} opacity="0.95" />
              <text x={tx + tw / 2} y={ty + 26} textAnchor="middle" fontSize="14"
                    fontFamily="ui-serif, Georgia, serif" fontWeight="700" fill={CREAM}>
                {hoverStop.label}
              </text>
              <text x={tx + tw / 2} y={ty + 46} textAnchor="middle" fontSize="12"
                    fontFamily="ui-sans-serif, system-ui" fill={CREAM} opacity="0.85">
                {hoverStop.hint}
              </text>
              <polygon
                points={`${hoverStop.x - 7},${ty + 62} ${hoverStop.x + 7},${ty + 62} ${hoverStop.x},${ty + 71}`}
                fill={BROWN} opacity="0.95"
              />
            </g>
          );
        })()}

        {/* Rose des vents */}
        <g transform="translate(905, 280)">
          <circle cx="0" cy="0" r="34" fill={CREAM} stroke={LABEL} strokeWidth="1" opacity="0.9" />
          <circle cx="0" cy="0" r="3" fill={LABEL} opacity="0.5" />
          <polygon points="0,-28 -6,-3 6,-3" fill={TERRA} opacity="0.9" />
          <polygon points="0,28 -5,3 5,3" fill={SAND_STROKE} opacity="0.55" />
          <polygon points="28,0 3,-5 3,5" fill={SAND_STROKE} opacity="0.6" />
          <polygon points="-28,0 -3,-5 -3,5" fill={SAND_STROKE} opacity="0.6" />
          <text x="0" y="-38" fontSize="14" textAnchor="middle"
                fill={TERRA} fontFamily="ui-serif, Georgia, serif"
                fontWeight="700" letterSpacing="1">
            N
          </text>
        </g>

        {/* Légende bas */}
        <g transform="translate(60, 1150)">
          <line x1="0" y1="0" x2="32" y2="0" stroke={TERRA} strokeWidth="2.5" strokeDasharray="7 7" opacity="0.85" />
          <text x="42" y="5" fontSize="12" fill={LABEL}
                fontFamily="ui-serif, Georgia, serif" letterSpacing="2">
            ROUTE DU CIRCUIT
          </text>
        </g>
        <text x="500" y="1155" fontSize="13" textAnchor="middle"
              fill={LABEL} opacity="0.75"
              fontFamily="ui-serif, Georgia, serif" letterSpacing="5">
          NAMIBIE · CARTE DE L'ITINÉRAIRE
        </text>
      </svg>

      {steps[activeIndex] && (
        <div className="mt-4 flex items-baseline justify-between gap-4 px-1">
          <p className="text-[10px] uppercase tracking-[0.3em] text-clay">
            Étape {activeIndex + 1} / {steps.length}
            {steps[activeIndex].region && (
              <span className="text-muted-foreground normal-case tracking-normal"> — {steps[activeIndex].region}</span>
            )}
          </p>
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground hidden md:block">
            Cliquez une étape →
          </p>
        </div>
      )}
    </div>
  );
}
