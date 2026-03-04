"use client";

import { useState, useCallback } from "react";
import TarotCard from "@/components/TarotCard";

/* ── Types ──────────────────────────────────────────── */

interface Card {
  id: number;
  revealed: boolean;
  answer: "YES" | "NO" | null;
}

/* ── Helpers ────────────────────────────────────────── */

/** Create a fresh 7-card deck, all face-down. */
function createDeck(): Card[] {
  return Array.from({ length: 7 }, (_, i) => ({
    id: i + 1,
    revealed: false,
    answer: null,
  }));
}

/** Fisher-Yates shuffle — returns a new array, does not mutate. */
function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/* ── Page component ─────────────────────────────────── */

export default function HomePage() {
  const [cards, setCards] = useState<Card[]>(createDeck);

  /** Flip a single card and assign a random YES / NO answer. */
  const handleReveal = useCallback((id: number) => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === id && !card.revealed
          ? {
              ...card,
              revealed: true,
              answer: Math.random() < 0.5 ? "YES" : "NO",
            }
          : card
      )
    );
  }, []);

  /** Reset — brand-new deck, all cards face-down. */
  const handleReset = () => setCards(createDeck());

  /**
   * Shuffle — reorder the array visually while preserving each
   * card's revealed state and answer.
   */
  const handleShuffle = () => setCards((prev) => shuffle(prev));

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-indigo-950 to-gray-950 text-white px-4 py-12 flex flex-col items-center gap-12">

      {/* ── Header ──────────────────────────────────────── */}
      <header className="text-center space-y-2">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-widest text-yellow-400 drop-shadow-[0_0_24px_rgba(251,191,36,0.55)]">
          Yes/No Tarot
        </h1>
        <p className="text-yellow-600/60 text-sm tracking-[0.3em] uppercase">
          Pick a card.
        </p>
      </header>

      {/* ── Card spread ─────────────────────────────────── */}
      {/*
        Responsive columns:
          - mobile  (< 640 px) : 3 cards wide  → 3 + 3 + 1
          - sm      (≥ 640 px) : 4 cards wide  → 4 + 3
          - lg      (≥ 1024px) : 7 cards wide  → all in one row
        grid-cols-7 is a built-in Tailwind v3 utility.
      */}
      <section
        className="w-full max-w-3xl grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4"
        aria-label="Tarot card spread"
      >
        {cards.map((card) => (
          <TarotCard
            key={card.id}
            id={card.id}
            revealed={card.revealed}
            answer={card.answer}
            onReveal={handleReveal}
          />
        ))}
      </section>

      {/* ── Controls ────────────────────────────────────── */}
      <div
        className="flex gap-4"
        role="group"
        aria-label="Card controls"
      >
        <button
          onClick={handleReset}
          className="
            px-6 py-2 rounded-full text-sm tracking-widest uppercase
            border border-yellow-700/40 text-yellow-400/80
            hover:bg-yellow-400/10 hover:border-yellow-500/60 hover:text-yellow-300
            transition-all duration-200
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400
          "
        >
          Reset
        </button>
        <button
          onClick={handleShuffle}
          className="
            px-6 py-2 rounded-full text-sm tracking-widest uppercase
            border border-yellow-700/40 text-yellow-400/80
            hover:bg-yellow-400/10 hover:border-yellow-500/60 hover:text-yellow-300
            transition-all duration-200
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400
          "
        >
          Shuffle
        </button>
      </div>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="mt-auto text-yellow-900/40 text-xs tracking-widest">
        Trust the cards.
      </footer>

    </main>
  );
}
