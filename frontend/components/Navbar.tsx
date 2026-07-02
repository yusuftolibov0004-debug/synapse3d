"use client";

import { useAppStore } from "@/store/useAppStore";

/**
 * components/Navbar.tsx
 *
 * Yuqori navigatsiya paneli — logotip, ulanish holati indikatori.
 */
export default function Navbar() {
  const connectionStatus = useAppStore((state) => state.connectionStatus);

  const statusConfig = {
    connected: { color: "var(--color-neon-green)", label: "Ulangan" },
    connecting: { color: "var(--color-neon-orange)", label: "Ulanmoqda..." },
    disconnected: { color: "var(--color-neon-red)", label: "Ulanmagan" },
  }[connectionStatus];

  return (
    <nav className="w-full h-16 px-6 flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
      {/* Logotip */}
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold tracking-widest text-[var(--color-neon-blue)]">
          SYNAPSE 3D
        </span>
      </div>

      {/* Ulanish holati indikatori */}
      <div className="flex items-center gap-2 text-sm font-mono text-[var(--color-text-secondary)]">
        <span
          className="w-2.5 h-2.5 rounded-full"
          style={{
            backgroundColor: statusConfig.color,
            boxShadow: `0 0 8px ${statusConfig.color}`,
          }}
        />
        <span>{statusConfig.label}</span>
      </div>
    </nav>
  );
}