"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ARButton, XR } from "@react-three/xr";
import { OrbitControls } from "@react-three/drei";

export default function ARScan() {
  const [isPresenting, setIsPresenting] = useState(false);

  return (
    <div className="h-full w-full relative">
      {isPresenting && (
        <div className="absolute top-4 left-0 right-0 z-10 flex justify-center">
          <ARButton
            sessionInit={{ requiredFeatures: ["hit-test"] }}
            onSessionStart={() => setIsPresenting(true)}
            onSessionEnd={() => setIsPresenting(false)}
            className="bg-primary text-white px-6 py-3 rounded-lg shadow-lg hover:bg-opacity-90 transition"
          >
            Start AR Experience
          </ARButton>
        </div>
      )}

      <Canvas>
        <XR>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          {isPresenting ? <ARScene /> : <PreviewScene />}
        </XR>
      </Canvas>
    </div>
  );
}

function PreviewScene() {
  return (
    <>
      <OrbitControls />
      <gridHelper args={[10, 10, "#6E9075", "#A78B71"]} />
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#A78B71" />
      </mesh>
    </>
  );
}

function ARScene() {
  return (
    <>
      <gridHelper args={[10, 10, "#6E9075", "#A78B71"]} />
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#A78B71" />
      </mesh>
    </>
  );
}
