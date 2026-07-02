"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import Hub from "./Hub";
import StarField from "./StarField";
import FinanceBuilding from "./FinanceBuilding";
import ServerNode from "./ServerNode";

/**
 * components/scene/Scene.tsx
 *
 * 3D Command Deck'ning asosiy sahnasi. Bloom postprocessing effekti
 * barcha emissive (yorug'lik chiqaruvchi) materiallarni "neon" qilib
 * porlatadi.
 */
export default function Scene() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [6, 4, 6], fov: 50 }}>
        {/* Fon rangi va uzoqlik tumani — chuqurlik hissi uchun */}
        <color attach="background" args={["#05070d"]} />
        <fog attach="fog" args={["#05070d", 8, 22]} />

        {/* Yoritish */}
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#00d4ff" />
        <pointLight position={[-5, -3, -5]} intensity={0.5} color="#ff2d55" />

        {/* Fon zarrachalari */}
        <StarField />

        {/* Markaziy obyekt */}
        <Hub />

        {/* Moliya binosi */}
        <FinanceBuilding status="healthy" position={[-2.5, 0, 0]} />

        {/* Server tuguni — hozircha 60% yuklama, qo'lda */}
        <ServerNode load={0.6} position={[2.5, 0, 0]} />

        {/* Kamera boshqaruvi */}
        <OrbitControls
          enablePan={false}
          minDistance={3}
          maxDistance={16}
          autoRotate
          autoRotateSpeed={0.5}
        />

        {/* Postprocessing — neon Bloom effekti */}
        <EffectComposer>
          <Bloom
            intensity={1.2}
            luminanceThreshold={0.15}
            luminanceSmoothing={0.4}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}