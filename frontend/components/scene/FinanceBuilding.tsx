"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export type FinanceStatus = "healthy" | "warning" | "critical";

interface FinanceBuildingProps {
  status?: FinanceStatus;
  position?: [number, number, number];
}

/**
 * components/scene/FinanceBuilding.tsx
 *
 * "Moliya Binosi" — kompaniyaning moliyaviy holatini ifodalovchi 3D
 * obyekt. Holatga qarab rangi o'zgaradi:
 *  - healthy  -> yashil (yaxshi)
 *  - warning  -> olovrang (ehtiyot bo'lish kerak)
 *  - critical -> qizil (inqiroz)
 *
 * Hozircha status "prop" orqali qo'lda beriladi — keyingi fazada
 * (WebSocket integratsiyasi) bu qiymat backenddan real vaqtda keladi.
 */
const STATUS_COLORS: Record<FinanceStatus, string> = {
  healthy: "#00ff9c",
  warning: "#ff8a00",
  critical: "#ff2d55",
};

export default function FinanceBuilding({
  status = "healthy",
  position = [-2.5, 0, 0],
}: FinanceBuildingProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const color = STATUS_COLORS[status];

  // Yengil "nafas olish" animatsiyasi — o'lchami sal katta-kichik bo'lib turadi
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const pulse = 1 + Math.sin(clock.getElapsedTime() * 1.5) * 0.03;
      meshRef.current.scale.set(pulse, 1, pulse);
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef} position={[0, 0.75, 0]}>
        {/* Minora shaklidagi geometriya — past-poligonli */}
        <cylinderGeometry args={[0.4, 0.5, 1.5, 6]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          wireframe
        />
      </mesh>
    </group>
  );
}