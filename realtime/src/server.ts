/**
 * src/server.ts
 *
 * Synapse 3D uchun real-time WebSocket server. Bu server FastAPI
 * backend'dan signal qabul qiladi (keyingi bosqichda) va barcha
 * ulangan frontend klientlarga (3D sahnaga) real vaqtda uzatadi.
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

  // Klientga xush kelibsiz xabari
  ws.send(JSON.stringify({ type: "welcome", message: "Synapse3D realtime serverga ulandingiz" }));

  ws.on("close", () => {
    clients.delete(ws);
    console.log(`[WS] Klient uzildi. Jami klientlar: ${clients.size}`);
  });

  ws.on("error", (err) => {
    console.error("[WS] Xatolik:", err);
  });
});

httpServer.listen(PORT, () => {
  console.log(`🚀 Synapse3D Realtime Server ishga tushdi: http://localhost:${PORT}`);
  console.log(`🔌 WebSocket manzili: ws://localhost:${PORT}`);
});