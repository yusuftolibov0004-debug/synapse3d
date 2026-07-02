"use client";

import { useAppStore, type AppSection } from "@/store/useAppStore";

/**
 * components/Sidebar.tsx
 *
 * Chap tomondagi navigatsiya — modullar orasida o'tish uchun.
 */
const MENU_ITEMS: { key: AppSection; label: string; icon: string }[] = [
  { key: "dashboard", label: "Dashboard", icon: "◈" },
  { key: "finance", label: "Moliya", icon: "◆" },
  { key: "servers", label: "Serverlar", icon: "▣" },
  { key: "agents", label: "AI Agentlar", icon: "◉" },
];

export default function Sidebar() {
  const activeSection = useAppStore((state) => state.activeSection);
  const setActiveSection = useAppStore((state) => state.setActiveSection);

  return (
    <aside className="w-56 h-full border-r border-[var(--color-border)] bg-[var(--color-bg-secondary)] flex flex-col py-6">
      {MENU_ITEMS.map((item) => {
        const isActive = activeSection === item.key;
        return (
          <button
            key={item.key}
            onClick={() => setActiveSection(item.key)}
            className="flex items-center gap-3 px-6 py-3 text-left transition-colors"
            style={{
              color: isActive
                ? "var(--color-neon-blue)"
                : "var(--color-text-secondary)",
              backgroundColor: isActive
                ? "rgba(0, 212, 255, 0.08)"
                : "transparent",
              borderLeft: isActive
                ? "2px solid var(--color-neon-blue)"
                : "2px solid transparent",
            }}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-sm tracking-wide">{item.label}</span>
          </button>
        );
      })}
    </aside>
  );
}