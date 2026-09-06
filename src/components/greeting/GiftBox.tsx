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
            exit={{ scale: 0.6, opacity: 0, y: 40 }}
            aria-label={t.gift.open}
            className="group relative h-64 w-64 focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--gold)]/50 sm:h-72 sm:w-72"
            style={{ perspective: 900 }}
          >
            <motion.span
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 block"
            >
              {/* floor shadow */}
              <span
                aria-hidden
                className="absolute bottom-1 left-1/2 h-5 w-44 -translate-x-1/2 rounded-[50%] blur-md"
                style={{ background: "oklch(0.26 0.04 55 / 0.45)" }}
              />

              {/* box body */}
              <span
                aria-hidden
                className="absolute bottom-6 left-1/2 h-36 w-52 -translate-x-1/2 rounded-b-[6px] rounded-t-[3px]"
                style={{
                  background:
                    "linear-gradient(100deg, oklch(0.40 0.075 25) 0%, oklch(0.52 0.10 28) 22%, oklch(0.60 0.11 30) 48%, oklch(0.45 0.085 26) 78%, oklch(0.34 0.06 24) 100%)",
                  boxShadow:
                    "inset 0 -18px 26px oklch(0.2 0.04 25 / 0.55), inset 0 8px 14px oklch(1 0 0 / 0.12), 0 22px 34px -18px oklch(0.26 0.04 55 / 0.7)",
                }}
              />
              {/* vertical ribbon on body */}
              <span
                aria-hidden
                className="absolute bottom-6 left-1/2 h-36 w-9 -translate-x-1/2"
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.55 0.09 85) 0%, oklch(0.86 0.13 88) 40%, oklch(0.74 0.12 82) 60%, oklch(0.5 0.085 78) 100%)",
                  boxShadow: "0 0 10px oklch(0.74 0.12 82 / 0.5)",
                }}
              />

              {/* lid */}
              <motion.span
                aria-hidden
                className="absolute left-1/2 top-[62px] block h-12 w-60 origin-bottom -translate-x-1/2 rounded-[5px]"
                animate={{ rotate: [0, -3, 0, 2, 0] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  background:
                    "linear-gradient(100deg, oklch(0.44 0.08 25) 0%, oklch(0.58 0.105 28) 25%, oklch(0.66 0.115 30) 50%, oklch(0.48 0.09 26) 80%, oklch(0.36 0.065 24) 100%)",
                  boxShadow:
                    "inset 0 -10px 16px oklch(0.2 0.04 25 / 0.5), inset 0 6px 10px oklch(1 0 0 / 0.18), 0 12px 20px -10px oklch(0.26 0.04 55 / 0.6)",
                }}
              />
              {/* ribbon over lid */}
              <span
                aria-hidden
                className="absolute left-1/2 top-[62px] h-12 w-9 -translate-x-1/2"
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.55 0.09 85) 0%, oklch(0.88 0.13 88) 40%, oklch(0.74 0.12 82) 60%, oklch(0.5 0.085 78) 100%)",
                }}
              />

              {/* bow loops */}
              <span
                aria-hidden
                className="absolute left-1/2 top-[26px] h-10 w-16 -translate-x-[105%] -rotate-[28deg] rounded-[100%_0_100%_60%]"
                style={{
                  background: "linear-gradient(140deg, oklch(0.88 0.13 88), oklch(0.6 0.1 78))",
                  boxShadow: "inset 0 -6px 10px oklch(0.4 0.07 70 / 0.5)",
                }}
              />
              <span
                aria-hidden
                className="absolute left-1/2 top-[26px] h-10 w-16 translate-x-[5%] rotate-[28deg] rounded-[0_100%_60%_100%]"
                style={{
                  background: "linear-gradient(220deg, oklch(0.88 0.13 88), oklch(0.6 0.1 78))",
                  boxShadow: "inset 0 -6px 10px oklch(0.4 0.07 70 / 0.5)",
                }}
              />
              {/* bow knot */}
              <span
                aria-hidden
                className="absolute left-1/2 top-[50px] h-6 w-6 -translate-x-1/2 rounded-full"
                style={{
                  background: "radial-gradient(circle at 35% 30%, oklch(0.93 0.1 90), oklch(0.6 0.1 78))",
                  boxShadow: "0 4px 8px oklch(0.3 0.05 60 / 0.5)",
                }}
              />

              {/* sheen */}
              <motion.span
                aria-hidden
                className="absolute bottom-6 left-1/2 h-36 w-52 -translate-x-1/2 overflow-hidden rounded-[6px]"
              >
                <motion.span
                  className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-12"
                  style={{ background: "linear-gradient(90deg, transparent, oklch(1 0 0 / 0.3), transparent)" }}
                  animate={{ x: ["0%", "420%"] }}
                  transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 1.6, ease: "easeInOut" }}
                />
              </motion.span>
            </motion.span>

            <span className="absolute bottom-[-6px] left-0 right-0 text-sm font-semibold tracking-wide text-[var(--ink)]">
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
                <a
                  href="https://webinvite-six.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WebInvite"
                  className="grid h-20 w-20 place-items-center rounded-full border-4 text-lg font-bold transition-transform hover:scale-105"
                  style={{ borderColor: "var(--gold-deep)", color: "var(--gold-deep)" }}
                >
                  WI
                </a>
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
