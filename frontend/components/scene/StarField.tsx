"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * components/scene/StarField.tsx
 *
 * Orqa fonda sekin aylanib turuvchi zarrachalar maydoni — kosmik
 * chuqurlik hissini beradi. Sof dekorativ element, ma'lumotlarga
 * bog'liq emas.
 */
export default function StarField() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 800;

  // Zarrachalarning tasodifiy pozitsiyalarini bir marta hisoblaymiz
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30; // x
      arr[i * 3 + 1] = (Math.random() - 0.5) * 30; // y
      arr[i * 3 + 2] = (Math.random() - 0.5) * 30; // z
    }
    return arr;
  }, []);

  // Juda sekin aylanish — sezilarli, lekin diqqatni chalg'itmaydigan
  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#7a8ba8"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}