"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * components/scene/Hub.tsx
 *
 * "The Hub" — Command Deck'ning markaziy obyekti. Doim sekin aylanib
 * turadi, kompaniyaning "jonli yuragi"ni ifodalaydi. Keyingi fazalarda
 * bunga real backend ma'lumotlariga qarab reaksiya (pulslanish, rang
 * o'zgarishi) qo'shiladi.
 */
export default function Hub() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Har frame'da sekin aylanish
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      {/* Ikosaedr — low-poly, futuristik ko'rinish uchun */}
      <icosahedronGeometry args={[1.2, 0]} />
      <meshStandardMaterial
        color="#00d4ff"
        emissive="#00d4ff"
        emissiveIntensity={0.4}
        wireframe
      />
    </mesh>
  );
}