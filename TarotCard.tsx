"use client";

import { useState } from "react";

/* ── Types ──────────────────────────────────────────── */

type Answer = "YES" | "NO" | null;

interface TarotCardProps {
  /** 1-based card number, used for aria-label and the decorative index. */
  id: number;
  revealed: boolean;
  answer: Answer;
  /** Called once when the user clicks / keyboard-activates an unrevealed card. */
  onReveal: (id: number) => void;
}

/* ── Component ──────────────────────────────────────── */

export default function TarotCard({
  id,
  revealed,
  answer,
  onReveal,
}: TarotCardProps) {
  /**
   * `sparkling` is briefly true after a click to fire the gold
   * sparkle-pulse animation defined in globals.css.
   */
  const [sparkling, setSparkling] = useState(false);

  /* ── Handlers ─────────────────────────────────────── */

  const handleReveal = () => {
    if (revealed) return; // already flipped — ignore
    setSparkling(true);
    onReveal(id);
    // Remove sparkle class after the CSS animation finishes (~850 ms)
    setTimeout(() => setSparkling(false), 900);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleReveal();
    }
  };

  /* ── Class strings ────────────────────────────────── */

  /**
   * .card-scene  — sets perspective (globals.css)
   * .hoverable   — enables the float-on-hover lift (removed after reveal)
   * .card-sparkle — gold glow pulse triggered on click (globals.css)
   * aspect-[2/3] — portrait tarot card proportions
   */
  const sceneClasses = [
    "card-scene w-full aspect-[2/3]",
    !revealed && "hoverable",
    sparkling && "card-sparkle",
  ]
    .filter(Boolean)
    .join(" ");

  /**
   * .card-inner   — rotates in 3-D (globals.css)
   * .is-flipped   — triggers the 180° Y rotation (globals.css)
   */
  const innerClasses = [
    "card-inner rounded-xl",
    revealed && "is-flipped",
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-yellow-400/70",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={sceneClasses}>
      {/*
        The inner div acts as the interactive button.
        role="button" + tabIndex={0} makes it keyboard-accessible.
        aria-pressed signals the revealed / unrevealed state to
        assistive technologies.
      */}
      <div
        role="button"
        tabIndex={0}
        aria-label={
          revealed
            ? `Card ${id} — answer: ${answer}`
            : `Card ${id} — click to reveal`
        }
        aria-pressed={revealed}
        onClick={handleReveal}
        onKeyDown={handleKeyDown}
        className={innerClasses}
        style={{ cursor: revealed ? "default" : "pointer" }}
      >

        {/* ══════════════════════════════════════════════
            FRONT FACE — decorative back of card
            Visible when the card is face-down.
            ══════════════════════════════════════════════ */}
        <div className="
          card-face rounded-xl overflow-hidden
          border-2 border-yellow-700/40
          bg-gradient-to-b from-indigo-950 via-violet-950 to-indigo-950
          transition-shadow duration-300
          hover:shadow-[0_0_22px_5px_rgba(251,191,36,0.28)]
        ">
          {/* Mystical geometric SVG pattern */}
          <div
            className="absolute inset-0 flex items-center justify-center p-3 pointer-events-none"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 100 150"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.9"
              className="w-full h-full text-yellow-400 opacity-[0.18]"
            >
              {/* Concentric circles */}
              <circle cx="50" cy="75" r="44" />
              <circle cx="50" cy="75" r="31" />
              <circle cx="50" cy="75" r="17" />
              {/* Eight-pointed star */}
              <polygon points="50,31 61,64 94,64 68,83 79,115 50,96 21,115 32,83 6,64 39,64" />
              {/* Cross-hair + diagonals */}
              <line x1="50" y1="4"  x2="50" y2="146" />
              <line x1="4"  y1="75" x2="96" y2="75" />
              <line x1="17" y1="26" x2="83" y2="124" />
              <line x1="83" y1="26" x2="17" y2="124" />
            </svg>
          </div>

          {/* Subtle inner border frame for depth */}
          <div
            className="absolute inset-[6px] rounded-lg border border-yellow-600/12 pointer-events-none"
            aria-hidden="true"
          />

          {/* Zero-padded card index */}
          <span className="absolute top-2 left-2.5 font-mono text-[10px] tracking-widest text-yellow-600/35">
            {String(id).padStart(2, "0")}
          </span>
        </div>

        {/* ══════════════════════════════════════════════
            BACK FACE — revealed answer
            Pre-rotated 180° in globals.css; becomes visible
            when .card-inner rotates to the flipped state.
            ══════════════════════════════════════════════ */}
        <div
          className={[
            "card-face card-back-face rounded-xl overflow-hidden border-2",
            "flex flex-col items-center justify-center gap-2",
            answer === "YES"
              ? "border-amber-500/55 bg-gradient-to-b from-amber-950 via-yellow-950 to-amber-950"
              : "border-violet-500/55 bg-gradient-to-b from-violet-950 via-purple-950 to-violet-950",
          ].join(" ")}
        >
          {/* Large YES / NO answer */}
          <span
            className={[
              "text-4xl sm:text-5xl font-black tracking-widest",
              answer === "YES"
                ? "text-amber-300 drop-shadow-[0_0_16px_rgba(251,191,36,0.9)]"
                : "text-violet-300 drop-shadow-[0_0_16px_rgba(167,139,250,0.9)]",
            ].join(" ")}
          >
            {answer}
          </span>

          {/* Subtitle */}
          <span className="text-[11px] text-neutral-400 italic text-center leading-snug px-3">
            The cards<br />have spoken.
          </span>
        </div>

      </div>
    </div>
  );
}
