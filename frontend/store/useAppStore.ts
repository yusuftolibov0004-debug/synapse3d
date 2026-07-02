/**
 * store/useAppStore.ts
 *
 * Ilovaning global holati (state). Hozircha asosiy navigatsiya va
 * ulanish holatini saqlaymiz. Keyingi fazalarda WebSocket holati,
 * moliya/server ma'lumotlari ham shu yerga qo'shiladi.
 */

import { create } from "zustand";

export type AppSection = "dashboard" | "finance" | "servers" | "agents";

interface AppState {
  // Qaysi bo'lim faol ekanligi (Sidebar orqali o'zgaradi)
  activeSection: AppSection;
  setActiveSection: (section: AppSection) => void;

  // Backend/WebSocket ulanish holati
  connectionStatus: "connecting" | "connected" | "disconnected";
  setConnectionStatus: (status: AppState["connectionStatus"]) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeSection: "dashboard",
  setActiveSection: (section) => set({ activeSection: section }),

  connectionStatus: "disconnected",
  setConnectionStatus: (status) => set({ connectionStatus: status }),
}));