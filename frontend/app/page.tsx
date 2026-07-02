"use client";

import Scene from "@/components/scene/Scene";
import { useWebSocket } from "@/hooks/useWebSocket";

/**
 * Bosh sahifa — 3D Command Deck sahnasini ko'rsatadi va real-time
 * serverga ulanadi.
 */
export default function Home() {
  useWebSocket((data) => {
    console.log("Backenddan kelgan ma'lumot:", data);
  });

  return (
    <main className="w-full h-full bg-[var(--color-bg-primary)]">
      <Scene />
    </main>
  );
}