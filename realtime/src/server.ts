/**
 * src/server.ts
 *
 * Synapse 3D uchun real-time WebSocket server. Bu server FastAPI
 * backend'dan HTTP orqali signal qabul qiladi (POST /broadcast) va
 * barcha ulangan frontend klientlarga (3D sahnaga) WebSocket orqali
 * real vaqtda uzatadi.
 */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";

dotenv.config({ quiet: true });

const PORT = process.env.REALTIME_PORT || 4000;

const app = express();
app.use(cors());
app.use(express.json());

// Oddiy health-check endpoint — server ishlab turganini tekshirish uchun
app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "Synapse3D Realtime Server" });
});

const httpServer = createServer(app);
const wss = new WebSocketServer({ server: httpServer });

// Barcha ulangan klientlarni saqlaymiz
const clients = new Set<WebSocket>();

wss.on("connection", (ws) => {
  clients.add(ws);
  console.log(`[WS] Yangi klient ulandi. Jami klientlar: ${clients.size}`);

  ws.send(JSON.stringify({ type: "welcome", message: "Synapse3D realtime serverga ulandingiz" }));

  ws.on("close", () => {
    clients.delete(ws);
    console.log(`[WS] Klient uzildi. Jami klientlar: ${clients.size}`);
  });

  ws.on("error", (err) => {
    console.error("[WS] Xatolik:", err);
  });
});

/**
 * Barcha ulangan WebSocket klientlarga xabar yuboradi.
 */
function broadcast(payload: unknown) {
  const message = JSON.stringify(payload);
  let sentCount = 0;
  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
      sentCount++;
    }
  }
  return sentCount;
}

/**
 * POST /broadcast
 *
 * FastAPI backend shu endpointga so'rov yuborib, barcha ulangan
 * frontend klientlarga (3D sahnaga) real vaqtda ma'lumot uzatadi.
 *
 * Kutilayotgan body: { "type": "finance_update", "payload": {...} }
 */
app.post("/broadcast", (req, res) => {
  const { type, payload } = req.body;

  if (!type) {
    return res.status(400).json({ error: "'type' maydoni majburiy" });
  }

  const sentCount = broadcast({ type, payload });
  console.log(`[Broadcast] type=${type} -> ${sentCount} klientga yuborildi`);

  res.json({ status: "ok", sentTo: sentCount });
});

httpServer.listen(PORT, () => {
  console.log(`🚀 Synapse3D Realtime Server ishga tushdi: http://localhost:${PORT}`);
  console.log(`🔌 WebSocket manzili: ws://localhost:${PORT}`);
});