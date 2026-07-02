"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

/**
 * components/scene/Scene.tsx
 *
 * 3D Command Deck uchun eng birinchi sinov sahnasi.
 * Bu yerda faqat R3F to'g'ri ishlayotganini tekshiramiz —
 * keyingi bosqichlarda bu sahna asta-sekin "The Hub", "Moliya Binosi",
 * "Server Tuguni" kabi haqiqiy elementlarga aylanadi.
 */
export default function Scene() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [3, 3, 3], fov: 50 }}>
        {/* Yorug'lik — obyektlarni ko'rish uchun shart */}
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#00d4ff" />

        {/* Sinov obyekti — aylanayotgan kub */}
        <TestCube />

        {/* Sichqoncha bilan kamerani aylantirish imkoniyati */}
        <OrbitControls />
      </Canvas>
    </div>
  );
}

function TestCube() {
  return (
    <mesh rotation={[0.4, 0.4, 0]}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color="#00ff9c" wireframe />
    </mesh>
  );
}