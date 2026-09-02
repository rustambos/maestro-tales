import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import parchment from "@/assets/parchment.jpg";
import type { Dict } from "@/lib/i18n";

function Confetti({ show }: { show: boolean }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        angle: (i / 40) * Math.PI * 2,
        dist: 140 + ((i * 37) % 220),
        size: 5 + ((i * 7) % 9),
        color: ["var(--gold)", "var(--gold-deep)", "var(--forest)", "var(--brown)"][i % 4],
      })),
    [],
  );
  if (!show) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center">
      {pieces.map((p, i) => (
        <motion.span
          key={i}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos(p.angle) * p.dist,
            y: Math.sin(p.angle) * p.dist + 120,
            opacity: 0,
            scale: 0.4,
            rotate: 360,
          }}
          transition={{ duration: 1.6 + (i % 5) * 0.15, ease: "easeOut" }}
          className="absolute rounded-[2px]"
          style={{ width: p.size, height: p.size * 1.6, background: p.color }}
        />
      ))}
    </div>
  );
}

export function GiftBox({
  t,
  recipient,
  sender,
}: {
  t: Dict;
  recipient: string;
  sender: string;
}) {
  const [opened, setOpened] = useState(false);
  const [stamped, setStamped] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const notify = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2000);
  };

  const copyPromo = async () => {
    setStamped(true);
    window.setTimeout(() => setStamped(false), 600);
    try {
      await navigator.clipboard.writeText(t.gift.promo);
      notify(t.gift.copied);
    } catch {
      notify(t.gift.copied);
    }
  };

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      notify(t.gift.shareCopied);
    } catch {
      notify(t.gift.shareCopied);
    }
  };

  return (
    <div className="relative flex w-full flex-col items-center">
      <AnimatePresence mode="wait">
        {!opened && (
          <motion.button
            key="box"
            type="button"
            onClick={() => setOpened(true)}
            exit={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            aria-label={t.gift.open}
            className="animate-shimmer relative h-52 w-52 rounded-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--gold)]/50 sm:h-64 sm:w-64"
            style={{ background: "var(--gradient-gold)" }}
          >
            <span
              className="absolute inset-x-0 top-0 h-14 rounded-t-2xl border-b-2 border-[var(--cream)]/40 sm:h-16"
              style={{ background: "var(--gradient-gold)" }}
            />
            <span className="absolute inset-y-0 left-1/2 w-6 -translate-x-1/2 bg-[var(--forest)]/80" />
            <span className="absolute inset-x-0 top-14 h-6 bg-[var(--forest)]/80 sm:top-16" />
            <span className="absolute left-1/2 top-3 -translate-x-1/2 text-4xl">🎀</span>
            <span className="absolute bottom-4 left-0 right-0 text-sm font-semibold tracking-wide text-[var(--ink)]">
              {t.gift.open}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <Confetti show={opened} />

      <AnimatePresence>
        {opened && (
          <motion.div
            key="cert"
            initial={{ opacity: 0, y: 120, rotateX: 90, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 60, damping: 14, delay: 0.15 }}
            className="relative w-full max-w-2xl"
            style={{ perspective: 1200 }}
          >
            <div
              className="relative overflow-hidden rounded-lg border-8 p-6 text-center shadow-[var(--shadow-soft)] sm:p-10"
              style={{
                borderColor: "var(--gold)",
                backgroundImage: `url(${parchment})`,
                backgroundSize: "cover",
                color: "var(--ink)",
              }}
            >
              <div className="pointer-events-none absolute inset-2 rounded border border-[var(--gold-deep)]/60" />
              <p className="font-display text-3xl tracking-[0.3em] sm:text-4xl">{t.gift.certTitle}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.25em] text-[var(--brown)]">
                {t.gift.certSubtitle}
              </p>
              <div className="mx-auto my-5 h-px w-32 bg-[var(--gold-deep)]/60" />
              <p className="font-hand text-2xl text-[var(--brown)]">{t.gift.to(recipient)}</p>
              <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed sm:text-base">
                {t.gift.certBody}
              </p>

              <button
                type="button"
                onClick={copyPromo}
                className="group mx-auto mt-6 block"
                aria-label={`${t.gift.promoLabel}: ${t.gift.promo}`}
              >
                <motion.span
                  animate={stamped ? { scale: [1.35, 0.92, 1], rotate: [-8, -4, -4] } : { rotate: -4 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block rounded-md border-[3px] border-dashed border-[var(--destructive)] px-5 py-2"
                >
                  <span className="block text-[10px] font-bold tracking-[0.3em] text-[var(--destructive)]">
                    {t.gift.promoLabel}
                  </span>
                  <span className="block font-display text-2xl font-bold text-[var(--destructive)]">
                    {t.gift.promo}
                  </span>
                </motion.span>
              </button>

              <div className="mt-8 flex flex-col items-center gap-2">
                <div
                  className="grid h-20 w-20 place-items-center rounded-full border-4 text-lg font-bold"
                  style={{ borderColor: "var(--gold-deep)", color: "var(--gold-deep)" }}
                >
                  WI
                </div>
                <p className="font-hand text-xl text-[var(--brown)]">{t.gift.from(sender)}</p>
              </div>
            </div>

            <div className="mt-5 flex justify-center">
              <button
                type="button"
                onClick={share}
                className="rounded-full border border-[var(--gold)]/60 bg-card/70 px-6 py-2 text-sm font-medium backdrop-blur transition-colors hover:bg-card"
              >
                {t.gift.share}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[var(--ink)] px-5 py-2 text-sm text-[var(--cream)] shadow-lg"
            role="status"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
