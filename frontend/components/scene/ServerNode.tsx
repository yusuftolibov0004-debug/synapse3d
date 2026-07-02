"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ServerNodeProps {
  /** 0 dan 1 gacha — server yuklamasi (CPU/RAM o'rtacha) */
  load?: number;
  position?: [number, number, number];
}

/**
 * components/scene/ServerNode.tsx
 *
 * "Server Tuguni" — infratuzilma yuklamasini 3D ustunlar shaklida
 * ko'rsatadi. `load` qiymati qancha yuqori bo'lsa, ustun shuncha
 * baland va qizilroq bo'ladi.
 *
 * Hozircha `load` prop orqali qo'lda beriladi — keyingi fazada
 * (WebSocket) bu backenddan real vaqtda keladi.
 */
export default function ServerNode({
  load = 0.3,
  position = [2.5, 0, 0],
}: ServerNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Yuklama darajasiga qarab balandlik (0.3 dan 2.5 gacha)
  const height = 0.3 + load * 2.2;

  // Yuklama darajasiga qarab rang: past = ko'k, yuqori = qizil
  const color = new THREE.Color().lerpColors(
    new THREE.Color("#00d4ff"),
    new THREE.Color("#ff2d55"),
    load
  );

  // Yengil "titrash" — server "ishlayotgani"ni his qildirish uchun
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const jitter = Math.sin(clock.getElapsedTime() * 8) * 0.01 * load;
      meshRef.current.position.y = height / 2 + jitter;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef} position={[0, height / 2, 0]}>
        <boxGeometry args={[0.5, height, 0.5]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          wireframe
        />
      </mesh>
    </group>
  );
}