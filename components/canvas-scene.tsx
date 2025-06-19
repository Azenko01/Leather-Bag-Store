"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei"
import { Suspense, useState } from "react"
import { SimpleBag, LeatherBagSafe } from "./leather-bag-3d"

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[2, 1.5, 0.3]} />
      <meshStandardMaterial color="#8B4513" />
    </mesh>
  )
}

export function CanvasScene() {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div className="h-[600px] flex items-center justify-center bg-gradient-to-br from-amber-100 to-orange-200 rounded-lg">
        <div className="text-center">
          <div className="w-24 h-16 bg-amber-800 rounded-lg mx-auto mb-4 shadow-lg"></div>
          <p className="text-amber-800 font-medium">Premium Leather Briefcase</p>
          <p className="text-amber-600 text-sm">3D Preview</p>
        </div>
      </div>
    )
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      onCreated={({ gl }) => {
        gl.setClearColor("#f59e0b", 0)
      }}
      onError={(error) => {
        console.warn("Canvas error:", error)
        setHasError(true)
      }}
    >
      <Suspense fallback={<LoadingFallback />}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <pointLight position={[-10, -10, -5]} intensity={0.3} />

        {/* Try to load textured model, fallback to simple model */}
        <Suspense fallback={<SimpleBag />}>
          <LeatherBagSafe />
        </Suspense>

        <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} far={4} />
        <Environment preset="studio" />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={2}
        />
      </Suspense>
    </Canvas>
  )
}
