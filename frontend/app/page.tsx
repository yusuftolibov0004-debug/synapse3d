"use client";

import { useEffect, useState } from "react";

/**
 * Bosh sahifa — hozircha oddiy "kirish ekrani".
 * Keyingi fazalarda bu yerga 3D Command Deck (Three.js sahnasi) joylashadi.
 */
export default function Home() {
  const [dotCount, setDotCount] = useState(0);

  // "Loading..." matni yonida nuqtalarni animatsiya qilamiz (. .. ...)
  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev + 1) % 4);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[var(--color-bg-primary)]">
      <div className="flex flex-col items-center gap-6">
        {/* Logotip / nom */}
        <h1 className="text-4xl md:text-6xl font-bold tracking-widest text-[var(--color-neon-blue)] neon-glow-blue px-6 py-3">
          SYNAPSE 3D
        </h1>

        <p className="text-[var(--color-text-secondary)] text-sm md:text-base tracking-wide">
          Next-Gen AI-Driven Operations Command
        </p>

        {/* Yuklanish indikatori */}
        <div className="mt-8 flex items-center gap-2 text-[var(--color-neon-green)] font-mono text-lg">
          <span>Initializing system{".".repeat(dotCount)}</span>
        </div>

        {/* Status chiziqchalar (dekorativ) */}
        <div className="flex gap-2 mt-4">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-[var(--color-neon-green)]"
              style={{
                opacity: dotCount >= i ? 1 : 0.2,
                transition: "opacity 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}