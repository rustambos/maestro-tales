import { useMemo } from "react";

type Particle = {
  left: number;
  size: number;
  duration: number;
  delay: number;
  kind: "leaf" | "star" | "book" | "pen";
};

const GLYPH: Record<Particle["kind"], string> = {
  leaf: "🍂",
  star: "✦",
  book: "📖",
  pen: "✒️",
};

export function Ambient({ count = 22 }: { count?: number }) {
  const particles = useMemo<Particle[]>(() => {
    const kinds: Particle["kind"][] = ["leaf", "leaf", "star", "star", "book", "pen"];
    return Array.from({ length: count }, (_, i) => ({
      left: (i * 97) % 100,
      size: 10 + ((i * 13) % 18),
      duration: 18 + ((i * 7) % 22),
      delay: (i * 3.1) % 26,
      kind: kinds[i % kinds.length]!,
    }));
  }, [count]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {particles.map((p, i) => (
        <span
          key={i}
          className="animate-float-up absolute bottom-[-10vh] select-none opacity-70"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            color: "var(--gold)",
          }}
        >
          {GLYPH[p.kind]}
        </span>
      ))}
    </div>
  );
}

export function ChalkDivider() {
  return (
    <div aria-hidden className="relative mx-auto h-16 w-full max-w-3xl">
      <svg viewBox="0 0 800 40" className="h-full w-full" preserveAspectRatio="none">
        <path
          d="M10 22 C 160 6, 300 34, 420 18 S 660 8, 790 24"
          fill="none"
          stroke="var(--gold)"
          strokeOpacity="0.6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="6 10"
        />
      </svg>
    </div>
  );
}
