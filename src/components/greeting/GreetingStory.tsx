import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import cover from "@/assets/cover.jpg";
import memory1 from "@/assets/memory1.jpg";
import memory2 from "@/assets/memory2.jpg";
import memory3 from "@/assets/memory3.jpg";
import { DICTS, LANGS, type Lang } from "@/lib/i18n";
import { Ambient, ChalkDivider } from "./Ambient";
import { GiftBox } from "./GiftBox";
import { MusicPlayer } from "./MusicPlayer";
import { PersonalizeDialog } from "./PersonalizeDialog";

const SECTIONS = ["intro", "greeting", "value", "memories", "quotes", "gift"] as const;
type SectionId = (typeof SECTIONS)[number];

function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    const onTilt = (e: DeviceOrientationEvent) => {
      setPos({
        x: Math.max(-1, Math.min(1, (e.gamma ?? 0) / 45)),
        y: Math.max(-1, Math.min(1, (e.beta ?? 0) / 90)),
      });
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("deviceorientation", onTilt);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("deviceorientation", onTilt);
    };
  }, []);
  return pos;
}

function Typewriter({ text, speed = 45 }: { text: string; speed?: number }) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    setShown("");
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [text, speed]);
  return <span>{shown}</span>;
}

export function GreetingStory({
  recipient,
  sender,
}: {
  recipient?: string | null;
  sender?: string | null;
}) {
  const [lang, setLang] = useState<Lang>("uz");
  const t = DICTS[lang];
  const [started, setStarted] = useState(false);
  const [active, setActive] = useState<SectionId>("intro");
  const mouse = useMousePosition();

  const displayRecipient = recipient?.trim() || t.defaults.recipient;
  const displaySender = sender?.trim() || t.defaults.sender;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll();
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  useEffect(() => {
    if (started) return;
    const html = document.documentElement;
    const prevBody = document.body.style.overflow;
    const prevHtml = html.style.overflow;
    document.body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = prevBody;
      html.style.overflow = prevHtml;
    };
  }, [started]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: SectionId) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div ref={containerRef} className="relative min-h-screen bg-background">
      <Ambient />
      <MusicPlayer t={t} autoStart={started} />
      <PersonalizeDialog t={t} />


      {/* Language switcher */}
      <div className="fixed right-4 top-4 z-50 flex gap-1 rounded-full border border-[var(--gold)]/40 bg-card/70 p-1 backdrop-blur">
        {LANGS.map((l) => (
          <button
            key={l.code}
            type="button"
            onClick={() => setLang(l.code)}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
              lang === l.code ? "text-[var(--ink)]" : "text-muted-foreground hover:text-foreground"
            }`}
            style={lang === l.code ? { background: "var(--gradient-gold)" } : undefined}
          >
            {l.label}
          </button>
        ))}
      </div>

      {/* WI button */}
      <a
        href="https://webinvite-six.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WebInvite"
        className="fixed bottom-5 right-20 z-50 grid h-12 w-12 place-items-center rounded-full border border-[var(--gold)]/60 bg-card/80 font-display text-sm font-bold tracking-wider text-[var(--gold-deep)] shadow-[var(--shadow-soft)] backdrop-blur transition-transform hover:scale-110"
      >
        WI
      </a>

      {/* Progress rail */}
      <nav
        aria-label="sections"
        className={`fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-4 transition-opacity md:flex ${
          started ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {SECTIONS.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => scrollTo(id)}
            className="group flex items-center gap-2"
            aria-label={t.nav[id]}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full border transition-all ${
                active === id
                  ? "scale-150 border-transparent bg-[var(--gold)]"
                  : "border-[var(--gold)]/60 bg-transparent"
              }`}
            />
            <span className="pointer-events-none whitespace-nowrap text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
              {t.nav[id]}
            </span>
          </button>
        ))}
      </nav>

      {/* 1. Cover */}
      <section id="intro" className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <motion.img
          src={cover}
          alt=""
          width={1920}
          height={1088}
          style={{ y: bgY, x: mouse.x * -14 }}
          className="absolute inset-0 h-full w-full scale-110 object-cover"
        />
        <div className="absolute inset-0 bg-[var(--cream)]/45" />
        <motion.div
          initial={{ rotateX: 85, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ perspective: 1000, x: mouse.x * 10, y: mouse.y * 8 }}
          className="relative z-10 mx-4 max-w-2xl rounded-2xl px-6 py-12 text-center glass-card"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--gold-deep)]">{t.cover.kicker}</p>
          <h1 className="text-gilded mt-4 font-display text-[1.55rem] leading-snug font-semibold sm:text-5xl md:text-6xl">
            {t.cover.title.split("").map((ch, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.045, duration: 0.4 }}
                className="inline-block whitespace-pre"
              >
                {ch}
              </motion.span>
            ))}
          </h1>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">{t.cover.subtitle}</p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 + t.cover.title.length * 0.045 }}
            className="mt-10 flex justify-center"
          >
            <button
              type="button"
              onClick={() => {
                setStarted(true);
                window.setTimeout(() => scrollTo("greeting"), 80);
              }}
              className="group relative grid h-36 w-36 place-items-center rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--gold)]/50"
            >
              {/* glow */}
              <motion.span
                aria-hidden
                animate={{ scale: [1, 1.25, 1], opacity: [0.45, 0.1, 0.45] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full"
                style={{ background: "var(--gradient-gold)", filter: "blur(18px)" }}
              />
              {/* rotating dashed ring */}
              <motion.span
                aria-hidden
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="absolute inset-1 rounded-full border-2 border-dashed border-[var(--gold-deep)]/70"
              />
              <motion.span
                aria-hidden
                animate={{ rotate: -360 }}
                transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 rounded-full border border-[var(--gold)]/60"
              />
              {/* wax seal */}
              <span
                className="relative grid h-24 w-24 place-items-center rounded-full text-center shadow-[var(--shadow-gold)] transition-transform duration-300 group-hover:scale-105 group-active:scale-95"
                style={{
                  background: "var(--gradient-gold)",
                  boxShadow:
                    "inset 0 3px 8px oklch(1 0 0 / 0.45), inset 0 -6px 14px oklch(0.36 0.055 52 / 0.45), var(--shadow-gold)",
                }}
              >
                <span className="px-2 font-display text-sm font-bold leading-tight tracking-wide text-[var(--ink)]">
                  {t.cover.cta}
                </span>
              </span>
              {/* sparkles */}
              {[0, 1, 2, 3].map((i) => (
                <motion.span
                  key={i}
                  aria-hidden
                  className="pointer-events-none absolute text-[var(--gold-deep)]"
                  style={{
                    left: `${[6, 86, 12, 82][i]}%`,
                    top: `${[14, 8, 80, 76][i]}%`,
                  }}
                  animate={{ opacity: [0, 1, 0], scale: [0.4, 1.1, 0.4] }}
                  transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.55 }}
                >
                  ✦
                </motion.span>
              ))}
            </button>
          </motion.div>
          {!started && (
            <motion.p
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.4, repeat: Infinity }}
              className="mt-5 text-[11px] uppercase tracking-[0.3em] text-[var(--gold-deep)]"
            >
              ↓
            </motion.p>
          )}

          <p className="mt-6 text-[11px] tracking-wide text-muted-foreground">{t.cover.date}</p>
        </motion.div>
      </section>

      <ChalkDivider />

      {/* 2. Greeting */}
      <section
        id="greeting"
        className="relative flex min-h-screen items-center justify-center px-4 py-24"
        style={{ background: "var(--gradient-dawn)" }}
      >
        <motion.article
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          style={{ x: mouse.x * 6, y: mouse.y * 6 }}
          className="glass-card relative z-10 max-w-2xl rounded-3xl p-8 text-center sm:p-12"
        >
          <div
            aria-hidden
            className="animate-shimmer pointer-events-none absolute -inset-1 -z-10 rounded-3xl"
          />
          <p className="font-hand text-3xl text-[var(--gold-deep)]">{t.greeting.heading}</p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl">{displayRecipient}</h2>
          <p className="mt-6 text-base leading-relaxed text-foreground/85">{t.greeting.body}</p>
          <p className="mt-8 text-sm text-muted-foreground">{t.greeting.signOff}</p>
          <p className="font-hand text-2xl text-[var(--brown)]">{displaySender}</p>
        </motion.article>
      </section>

      <ChalkDivider />

      {/* 3. Value */}
      <ValueSection t={t} />

      <ChalkDivider />

      {/* 4. Memories */}
      <section
        id="memories"
        className="relative min-h-screen px-4 py-24"
        style={{ background: "var(--gradient-dawn)" }}
      >
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <h2 className="font-display text-3xl sm:text-4xl">{t.memories.heading}</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">{t.memories.text}</p>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-8">
            {[memory1, memory2, memory3].map((src, i) => (
              <motion.figure
                key={src}
                initial={{ opacity: 0, y: 40, rotate: [-6, 4, -3][i] ?? 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                whileHover={{ rotate: 0, scale: 1.08, zIndex: 20 }}
                whileTap={{ rotate: 0, scale: 1.08 }}
                className="w-56 cursor-pointer bg-[var(--cream)] p-3 pb-10 shadow-[var(--shadow-soft)] sm:w-64"
                style={{ rotate: [-6, 4, -3][i] ?? 0 }}
              >
                <img
                  src={src}
                  alt={t.memories.captions[i]}
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="h-52 w-full object-cover sm:h-60"
                />
                <figcaption className="mt-3 font-hand text-xl text-[var(--brown)]">
                  {t.memories.captions[i]}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <ChalkDivider />

      {/* 5. Quotes */}
      <QuotesSection t={t} />

      <ChalkDivider />

      {/* 6. Gift */}
      <section
        id="gift"
        className="relative flex min-h-screen flex-col items-center justify-center gap-8 px-4 py-24"
        style={{ background: "var(--gradient-dawn)" }}
      >
        <div className="relative z-10 text-center">
          <h2 className="font-display text-3xl sm:text-4xl">{t.gift.heading}</h2>
          <p className="mt-3 text-sm text-muted-foreground">{t.gift.text}</p>
        </div>
        <div className="relative z-10 w-full max-w-2xl">
          <GiftBox t={t} recipient={displayRecipient} sender={displaySender} />
        </div>
        <footer className="relative z-10 pt-10 text-xs text-muted-foreground">
          {t.brand} · {t.cover.date}
        </footer>
      </section>

      {!started && <span className="sr-only">{t.cover.cta}</span>}
    </div>
  );
}

function ValueSection({ t }: { t: (typeof DICTS)[Lang] }) {
  const [stars, setStars] = useState<{ id: number; x: number; y: number }[]>([]);
  const nextId = useRef(0);

  const addStar = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = nextId.current++;
    setStars((s) => [...s, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    window.setTimeout(() => setStars((s) => s.filter((st) => st.id !== id)), 1800);
  };

  return (
    <section
      id="value"
      onClick={addStar}
      className="relative flex min-h-screen cursor-crosshair items-center justify-center overflow-hidden px-4 py-24"
      style={{ background: "var(--gradient-dusk)" }}
    >
      <div className="relative z-10 max-w-2xl text-center text-[var(--cream)]">
        <h2 className="font-display text-3xl sm:text-5xl text-gilded">{t.value.heading}</h2>
        <p className="mt-6 text-base leading-relaxed opacity-90">{t.value.text}</p>
        <p className="mt-10 text-xs uppercase tracking-[0.3em] opacity-70">{t.value.hint}</p>
        <p className="mt-2 font-hand text-2xl text-[var(--gold)]">{t.value.counter(nextId.current)}</p>
      </div>
      <AnimatePresence>
        {stars.map((s) => (
          <motion.span
            key={s.id}
            initial={{ opacity: 0, scale: 0, y: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1.6, 0.8], y: -80 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6 }}
            className="pointer-events-none absolute text-3xl"
            style={{ left: s.x, top: s.y, color: "var(--gold)" }}
          >
            ✦
          </motion.span>
        ))}
      </AnimatePresence>
    </section>
  );
}

function QuotesSection({ t }: { t: (typeof DICTS)[Lang] }) {
  const [index, setIndex] = useState(0);
  const items = useMemo(() => t.quotes.items, [t]);

  useEffect(() => {
    setIndex(0);
  }, [items]);

  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % items.length), 7000);
    return () => window.clearInterval(id);
  }, [items]);

  return (
    <section
      id="quotes"
      className="relative flex min-h-screen items-center justify-center px-4 py-24"
      style={{ background: "var(--gradient-forest)" }}
    >
      <div className="relative z-10 w-full max-w-3xl">
        {/* wooden frame */}
        <div
          className="rounded-[14px] p-3 shadow-[var(--shadow-soft)] sm:p-4"
          style={{
            background:
              "linear-gradient(160deg, oklch(0.48 0.07 55), oklch(0.34 0.055 45) 45%, oklch(0.44 0.065 52))",
          }}
        >
          <div className="chalkboard relative overflow-hidden rounded-md px-5 py-10 text-center sm:px-10 sm:py-14">
            <h2 className="chalk-text font-hand text-3xl sm:text-5xl">{t.quotes.heading}</h2>
            <div
              aria-hidden
              className="mx-auto mt-4 h-px w-40 opacity-50"
              style={{ background: "oklch(0.97 0.01 100)" }}
            />
            <div className="mt-10 grid min-h-[9rem] place-items-center">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5 }}
                  className="chalk-text font-hand text-3xl leading-snug sm:text-4xl"
                >
                  “<Typewriter text={items[index] ?? ""} />”
                </motion.blockquote>
              </AnimatePresence>
            </div>
            <div className="mt-10 flex justify-center gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`${i + 1}`}
                  className={`h-2 rounded-full bg-[oklch(0.97_0.01_100)] transition-all ${
                    i === index ? "w-8 opacity-90" : "w-2 opacity-40"
                  }`}
                />
              ))}
            </div>
            {/* chalk dust / ledge */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 30%, oklch(1 0 0 / 0.6) 0 1px, transparent 2px), radial-gradient(circle at 70% 65%, oklch(1 0 0 / 0.5) 0 1px, transparent 2px), radial-gradient(circle at 45% 85%, oklch(1 0 0 / 0.4) 0 1px, transparent 2px)",
                backgroundSize: "180px 150px, 220px 190px, 260px 210px",
              }}
            />
          </div>
          {/* chalk ledge */}
          <div
            className="mx-auto mt-3 h-3 w-[96%] rounded-b-md"
            style={{
              background: "linear-gradient(180deg, oklch(0.52 0.07 58), oklch(0.33 0.05 45))",
            }}
          />
        </div>
      </div>
    </section>
  );
}

