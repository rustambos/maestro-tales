import { useEffect, useRef, useState } from "react";
import type { Dict } from "@/lib/i18n";

const VIDEO_ID = "-OquDU12Xgg";

export function MusicPlayer({ t, autoStart = false }: { t: Dict; autoStart?: boolean }) {
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const post = (func: string, args: unknown[] = []) => {
    frameRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args }),
      "*",
    );
  };

  useEffect(() => {
    if (autoStart) setPlaying(true);
  }, [autoStart]);

  useEffect(() => {
    if (playing) {
      post("unMute");
      post("setVolume", [45]);
      post("playVideo");
      const id = window.setTimeout(() => {
        post("unMute");
        post("playVideo");
      }, 800);
      return () => window.clearTimeout(id);
    }
    post("mute");
    return;
  }, [playing]);


  return (
    <>
      <iframe
        ref={frameRef}
        title="background music"
        className="pointer-events-none absolute h-px w-px opacity-0"
        src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&loop=1&controls=0&playsinline=1&enablejsapi=1&playlist=${VIDEO_ID}`}
        allow="autoplay; encrypted-media"
        tabIndex={-1}
        aria-hidden
      />
      <button
        type="button"
        onClick={() => setPlaying((p) => !p)}
        aria-label={playing ? t.music.on : t.music.off}
        title={playing ? t.music.on : t.music.off}
        className="group fixed bottom-5 left-5 z-50 grid h-14 w-14 place-items-center rounded-full border border-gold/50 bg-card/70 shadow-[var(--shadow-soft)] backdrop-blur transition-transform hover:scale-105"
      >
        <span
          className={`grid h-10 w-10 place-items-center rounded-full ${playing ? "animate-spin-slow" : ""}`}
          style={{
            background:
              "repeating-radial-gradient(circle at center, var(--brown) 0 2px, var(--ink) 2px 4px)",
          }}
        >
          <span className="grid h-4 w-4 place-items-center rounded-full bg-[var(--gold)] text-[8px] text-[var(--ink)]">
            {playing ? "" : "▶"}
          </span>
        </span>
      </button>
    </>
  );
}
