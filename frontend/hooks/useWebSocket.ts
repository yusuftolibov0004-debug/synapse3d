/**
 * hooks/useWebSocket.ts
 *
 * Node.js realtime serverga WebSocket orqali ulanish uchun hook.
 * Ulanish holatini kuzatadi va uzilib qolsa avtomatik qayta ulanadi.
 */

import { useEffect, useRef, useCallback } from "react";
import { useAppStore } from "@/store/useAppStore";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:4000";
const RECONNECT_DELAY_MS = 3000;

export function useWebSocket(onMessage?: (data: unknown) => void) {
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const setConnectionStatus = useAppStore((state) => state.setConnectionStatus);

  const connect = useCallback(() => {
    setConnectionStatus("connecting");
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("[WS] Serverga ulandi");
      setConnectionStatus("connected");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("[WS] Xabar keldi:", data);
        onMessage?.(data);
      } catch (err) {
        console.error("[WS] Xabarni parse qilishda xatolik:", err);
      }
    };

    ws.onclose = () => {
      console.log("[WS] Ulanish uzildi. Qayta urinish...");
      setConnectionStatus("disconnected");
      // Avtomatik qayta ulanish
      reconnectTimeoutRef.current = setTimeout(connect, RECONNECT_DELAY_MS);
    };

    ws.onerror = (err) => {
      console.error("[WS] Xatolik:", err);
      ws.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    connect();
    return () => {
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      wsRef.current?.close();
    };
  }, [connect]);
}