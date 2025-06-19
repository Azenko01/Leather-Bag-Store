"use client"

import { useRef, useEffect } from "react"
import { useLoader } from "@react-three/fiber"
import { TextureLoader, RepeatWrapping } from "three"

export function LeatherBag() {
  const meshRef = useRef<any>()

  // Load textures with proper error handling
  const textures = useLoader(TextureLoader, [
    "/textures/briefcase-basecolor.png",
    "/textures/briefcase-normal.png",
    "/textures/briefcase-metallic.png",
    "/textures/briefcase-roughness.png",
  ])

  // Safely destructure textures
  const [baseColor, normal, metallic, roughness] = Array.isArray(textures) ? textures : [null, null, null, null]

  // Material properties with fallback
  const materialProps = baseColor
    ? {
        map: baseColor,
        normalMap: normal,
        metalnessMap: metallic,
        roughnessMap: roughness,
        normalScale: [1, 1] as [number, number],
      }
    : {
        color: "#8B4513",
        roughness: 0.7,
        metalness: 0.1,
      }

  // Configure textures after loading
  useEffect(() => {
    if (textures && Array.isArray(textures)) {
      textures.forEach((texture) => {
        if (texture) {
          texture.wrapS = texture.wrapT = RepeatWrapping
          texture.flipY = false
        }
      })
    }
  }, [textures])

  return (
    <group ref={meshRef} scale={[1.2, 1.2, 1.2]}>
      {/* Main briefcase body */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 1.8, 0.4]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>

      {/* Briefcase handle */}
      <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
        <torusGeometry args={[0.6, 0.08, 8, 16]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>

      {/* Side details */}
      <mesh position={[-1.1, 0, 0.25]} castShadow receiveShadow>
        <boxGeometry args={[0.3, 1.6, 0.1]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>

      <mesh position={[1.1, 0, 0.25]} castShadow receiveShadow>
        <boxGeometry args={[0.3, 1.6, 0.1]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>

      {/* Metal clasps */}
      <mesh position={[0, -0.6, 0.25]} castShadow>
        <boxGeometry args={[0.4, 0.2, 0.05]} />
        <meshStandardMaterial color="#8B7355" metalness={0.9} roughness={0.1} />
      </mesh>

      <mesh position={[0, 0.6, 0.25]} castShadow>
        <boxGeometry args={[0.4, 0.2, 0.05]} />
        <meshStandardMaterial color="#8B7355" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  )
}

// Fallback 3D component without textures
export function SimpleBag() {
  const meshRef = useRef<any>()

  return (
    <group ref={meshRef} scale={[1.2, 1.2, 1.2]}>
      {/* Main briefcase body */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 1.8, 0.4]} />
        <meshStandardMaterial color="#8B4513" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Briefcase handle */}
      <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
        <torusGeometry args={[0.6, 0.08, 8, 16]} />
        <meshStandardMaterial color="#8B4513" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Side details */}
      <mesh position={[-1.1, 0, 0.25]} castShadow receiveShadow>
        <boxGeometry args={[0.3, 1.6, 0.1]} />
        <meshStandardMaterial color="#8B4513" roughness={0.7} metalness={0.1} />
      </mesh>

      <mesh position={[1.1, 0, 0.25]} castShadow receiveShadow>
        <boxGeometry args={[0.3, 1.6, 0.1]} />
        <meshStandardMaterial color="#8B4513" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Metal clasps */}
      <mesh position={[0, -0.6, 0.25]} castShadow>
        <boxGeometry args={[0.4, 0.2, 0.05]} />
        <meshStandardMaterial color="#8B7355" metalness={0.9} roughness={0.1} />
      </mesh>

      <mesh position={[0, 0.6, 0.25]} castShadow>
        <boxGeometry args={[0.4, 0.2, 0.05]} />
        <meshStandardMaterial color="#8B7355" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  )
}

// Alternative implementation with individual texture loading
export function LeatherBagSafe() {
  const meshRef = useRef<any>()
  const baseColor = useLoader(TextureLoader, "/textures/briefcase-basecolor.png")
  const normal = useLoader(TextureLoader, "/textures/briefcase-normal.png")
  const metallic = useLoader(TextureLoader, "/textures/briefcase-metallic.png")
  const roughness = useLoader(TextureLoader, "/textures/briefcase-roughness.png")

  // Configure textures after loading
  useEffect(() => {
    ;[baseColor, normal, metallic, roughness].forEach((texture) => {
      if (texture) {
        texture.wrapS = texture.wrapT = RepeatWrapping
        texture.flipY = false
      }
    })
  }, [baseColor, normal, metallic, roughness])

  if (!baseColor || !normal || !metallic || !roughness) {
    console.warn("Failed to load textures, using fallback")
    return <SimpleBag />
  }

  return (
    <group ref={meshRef} scale={[1.2, 1.2, 1.2]}>
      {/* Main briefcase body */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 1.8, 0.4]} />
        <meshStandardMaterial
          map={baseColor}
          normalMap={normal}
          metalnessMap={metallic}
          roughnessMap={roughness}
          normalScale={[1, 1]}
        />
      </mesh>

      {/* Briefcase handle */}
      <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
        <torusGeometry args={[0.6, 0.08, 8, 16]} />
        <meshStandardMaterial map={baseColor} normalMap={normal} metalnessMap={metallic} roughnessMap={roughness} />
      </mesh>

      {/* Side details */}
      <mesh position={[-1.1, 0, 0.25]} castShadow receiveShadow>
        <boxGeometry args={[0.3, 1.6, 0.1]} />
        <meshStandardMaterial map={baseColor} normalMap={normal} metalnessMap={metallic} roughnessMap={roughness} />
      </mesh>

      <mesh position={[1.1, 0, 0.25]} castShadow receiveShadow>
        <boxGeometry args={[0.3, 1.6, 0.1]} />
        <meshStandardMaterial map={baseColor} normalMap={normal} metalnessMap={metallic} roughnessMap={roughness} />
      </mesh>

      {/* Metal clasps */}
      <mesh position={[0, -0.6, 0.25]} castShadow>
        <boxGeometry args={[0.4, 0.2, 0.05]} />
        <meshStandardMaterial color="#8B7355" metalness={0.9} roughness={0.1} />
      </mesh>

      <mesh position={[0, 0.6, 0.25]} castShadow>
        <boxGeometry args={[0.4, 0.2, 0.05]} />
        <meshStandardMaterial color="#8B7355" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  )
}
