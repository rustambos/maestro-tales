import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import type { Dict } from "@/lib/i18n";

function makeSlug(name: string) {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9а-яё\u0400-\u04FF]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 24);
  const rand = Math.random().toString(36).slice(2, 7);
  return `${base || "ustoz"}-${rand}`;
}

const EDIT_PASSWORD = "131700";

export function PersonalizeDialog({ t }: { t: Dict }) {
  const [open, setOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [sender, setSender] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);
  const [link, setLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient.trim() || !sender.trim()) return;
    setSaving(true);
    setError(false);
    const slug = makeSlug(recipient);
    const { error: err } = await supabase.from("greetings").insert({
      slug,
      recipient_name: recipient.trim().slice(0, 80),
      sender_name: sender.trim().slice(0, 80),
    });
    setSaving(false);
    if (err) {
      setError(true);
      return;
    }
    setLink(`${window.location.origin}/tabrik/${slug}`);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t.personalize.title}
        title={t.personalize.title}
        className="fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-full border border-gold/50 bg-card/80 text-lg shadow-[var(--shadow-soft)] backdrop-blur transition-transform hover:scale-110"
      >
        ✏️
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] grid place-items-center bg-[var(--ink)]/50 p-4 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card w-full max-w-md rounded-2xl p-6"
              role="dialog"
              aria-modal="true"
              aria-label={t.personalize.title}
            >
              <h3 className="font-display text-2xl">{t.personalize.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.personalize.subtitle}</p>

              {!link ? (
                <form onSubmit={save} className="mt-5 space-y-4">
                  <label className="block text-sm font-medium">
                    {t.personalize.recipient}
                    <input
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      placeholder={t.personalize.recipientPh}
                      maxLength={80}
                      required
                      className="mt-1 w-full rounded-lg border border-input bg-background/70 px-3 py-2 text-base outline-none focus:ring-2 focus:ring-[var(--gold)]"
                    />
                  </label>
                  <label className="block text-sm font-medium">
                    {t.personalize.sender}
                    <input
                      value={sender}
                      onChange={(e) => setSender(e.target.value)}
                      placeholder={t.personalize.senderPh}
                      maxLength={80}
                      required
                      className="mt-1 w-full rounded-lg border border-input bg-background/70 px-3 py-2 text-base outline-none focus:ring-2 focus:ring-[var(--gold)]"
                    />
                  </label>
                  {error && <p className="text-sm text-destructive">{t.personalize.error}</p>}
                  <div className="flex gap-3 pt-1">
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex-1 rounded-full px-5 py-2.5 text-sm font-semibold text-[var(--ink)] disabled:opacity-60"
                      style={{ background: "var(--gradient-gold)" }}
                    >
                      {saving ? t.personalize.saving : t.personalize.save}
                    </button>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="rounded-full border border-border px-5 py-2.5 text-sm"
                    >
                      {t.personalize.cancel}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="mt-5 space-y-3">
                  <p className="text-sm font-medium">{t.personalize.done}</p>
                  <p className="break-all rounded-lg border border-border bg-background/70 px-3 py-2 text-sm">
                    {link}
                  </p>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={async () => {
                        await navigator.clipboard.writeText(link);
                        setCopied(true);
                        window.setTimeout(() => setCopied(false), 1800);
                      }}
                      className="flex-1 rounded-full px-5 py-2.5 text-sm font-semibold text-[var(--ink)]"
                      style={{ background: "var(--gradient-gold)" }}
                    >
                      {copied ? t.gift.copied : t.personalize.copyLink}
                    </button>
                    <a
                      href={link}
                      className="rounded-full border border-border px-5 py-2.5 text-sm"
                    >
                      {t.personalize.open}
                    </a>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
