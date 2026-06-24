"use client"

import React, { useRef, Suspense, useEffect, useState } from "react"
import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { STLLoader } from "three/addons/loaders/STLLoader.js"
import * as THREE from "three"

function CameraFit({ geometry }: { geometry: THREE.BufferGeometry }) {
  const { camera, size } = useThree()

  useEffect(() => {
    if (!geometry.boundingBox) return
    const box = geometry.boundingBox
    const boxSize = new THREE.Vector3()
    box.getSize(boxSize)
    const center = new THREE.Vector3()
    box.getCenter(center)

    // scale factor matches the mesh scale
    const scale = 0.060
    const scaledW = boxSize.x * scale
    const scaledH = boxSize.y * scale

    const aspect = size.width / size.height
    const fov = (camera as THREE.PerspectiveCamera).fov * (Math.PI / 180)

    // fit the wider dimension into view with padding
    const fitH = (scaledH / 2) / Math.tan(fov / 2)
    const fitW = (scaledW / 2) / (Math.tan(fov / 2) * aspect)
    const dist = Math.max(fitH, fitW) * 1.2

    camera.position.set(center.x * scale + 0.5, 0, dist)
    camera.lookAt(center.x * scale + 0.5, 0, 0)
    ;(camera as THREE.PerspectiveCamera).updateProjectionMatrix()
  }, [geometry, camera, size])

  return null
}

function Model() {
  const geometry = useLoader(STLLoader, "/IEEE%20Logo%203D.stl")
  const meshRef = useRef<THREE.Mesh>(null)

  useEffect(() => {
    if (geometry) {
      geometry.center()
      geometry.computeVertexNormals()
      geometry.computeBoundingBox()
      geometry.computeBoundingSphere()
    }
  }, [geometry])

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime()
      meshRef.current.rotation.x = -Math.PI / 2 + Math.sin(t * 0.8) * 0.15
      meshRef.current.rotation.y = 0
      meshRef.current.rotation.z = 0
    }
  })

  return (
    <>
      <CameraFit geometry={geometry} />
      <mesh ref={meshRef} geometry={geometry} scale={0.060} position={[0.5, 0, 0]}>
        <meshStandardMaterial
          color="#0066aa"
          roughness={0.15}
          metalness={0.8}
          emissive="#002244"
          emissiveIntensity={0.3}
        />
      </mesh>
    </>
  )
}

export function IeeeLogo3D() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="h-[380px] md:h-[480px] flex items-center justify-center text-white text-sm">
        Preparing Stage...
      </div>
    )
  }

  return (
    <div className="w-full h-[380px] md:h-[480px] relative cursor-grab active:cursor-grabbing">
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center text-white text-sm font-medium animate-pulse">
            Loading 3D Object Mesh...
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 0, 28], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            preserveDrawingBuffer: false,
          }}
          style={{ background: "transparent" }}
          onCreated={({ gl }) => {
            gl.setClearColor(new THREE.Color(0x000000), 0)
            gl.domElement.addEventListener(
              "webglcontextlost",
              (e) => { e.preventDefault() },
              false
            )
          }}
        >
          {/* Soft ambient base */}
          <ambientLight intensity={0.4} />
          {/* Key light — front-right, warm white */}
          <directionalLight position={[5, 6, 20]} intensity={3.5} color="#ffffff" />
          {/* Fill light — front-left, cool blue tint */}
          <directionalLight position={[-5, 2, 18]} intensity={1.8} color="#a8cfff" />
          {/* Rim / back light — behind for edge glow */}
          <directionalLight position={[0, -4, -10]} intensity={1.5} color="#4499ff" />
          {/* Front top specular pop */}
          <pointLight position={[0, 10, 15]} intensity={2.5} color="#ffffff" />

          <Model />

          <OrbitControls enableZoom={false} />
        </Canvas>
      </Suspense>
    </div>
  )
}
