"use client"

import { useRef, useState, useEffect, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, OrbitControls, Sphere } from "@react-three/drei"
import { useTheme } from "next-themes"
import { useLanguage } from "@/context/language-context"
import type * as THREE from "three"

const skills = [
  { name: "Next.js", level: 0.85, color: "#000000" },
  { name: "Tailwind", level: 0.9, color: "#06B6D4" },
  { name: "Redux", level: 0.75, color: "#764ABC" },
  { name: "Politician", level: 0.75, color: "#764ABC" },
  { name: "Startup", level: 0.75, color: "#764ABC" },
  { name: "Entrepreneur", level: 0.75, color: "#764ABC" },
]

interface SkillNodeProps {
  skill: {
    name: string
    level: number
    color: string
  }
  index: number
  total: number
  hoveredSkill: string | null
  setHoveredSkill: (skill: string | null) => void
}

function SkillNode({ skill, index, total, hoveredSkill, setHoveredSkill }: SkillNodeProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Calculate position on a sphere
  const phi = Math.acos(-1 + (2 * index) / total)
  const theta = Math.sqrt(total * Math.PI) * phi
  const radius = 3

  const posX = radius * Math.cos(theta) * Math.sin(phi)
  const posY = radius * Math.sin(theta) * Math.sin(phi)
  const posZ = radius * Math.cos(phi)

  const isHovered = hoveredSkill === skill.name
  const textColor = isDark ? "white" : "black"

  return (
    <group
      position={[posX, posY, posZ]}
      scale={isHovered ? 1.2 : 1}
      onPointerOver={() => setHoveredSkill(skill.name)}
      onPointerOut={() => setHoveredSkill(null)}
    >
      <Sphere args={[skill.level * 0.4, 16, 16]}>
        <meshStandardMaterial color={skill.color} transparent opacity={0.7} />
      </Sphere>
      <Text
        position={[0, 0, skill.level * 0.4 + 0.2]}
        fontSize={0.3}
        color={textColor}
        anchorX="center"
        anchorY="middle"
      >
        {skill.name}
      </Text>
    </group>
  )
}

function SkillsVisualization() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current && !hoveredSkill) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1
    }
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <group ref={groupRef}>
        {skills.map((skill, index) => (
          <SkillNode
            key={skill.name}
            skill={skill}
            index={index}
            total={skills.length}
            hoveredSkill={hoveredSkill}
            setHoveredSkill={setHoveredSkill}
          />
        ))}
      </group>
      <OrbitControls enableZoom={false} enablePan={false} />
    </>
  )
}

function Fallback() {
  return (
    <div className="flex items-center justify-center h-[500px]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading 3D visualization...</p>
      </div>
    </div>
  )
}

export default function Skills3D() {
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <Fallback />

  if (error) {
    return (
      <div className="h-[500px] w-full flex items-center justify-center">
        <div className="text-center p-6 bg-destructive/10 rounded-lg max-w-md">
          <p className="text-destructive font-medium mb-2">Unable to load 3D visualization</p>
          <p className="text-muted-foreground text-sm">
            Your browser may not support WebGL or 3D rendering. Please try a different browser or view the skills in
            list mode.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-[500px] w-full relative">
      <ErrorBoundary fallback={<Fallback />} onError={setError}>
        <Suspense fallback={<Fallback />}>
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <SkillsVisualization />
          </Canvas>
        </Suspense>
      </ErrorBoundary>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-sm text-muted-foreground">
        <p>Drag to rotate | Hover over skills for details</p>
      </div>
    </div>
  )
}

// Simple error boundary component
class ErrorBoundary extends React.Component<{
  children: React.ReactNode
  fallback: React.ReactNode
  onError?: (error: Error) => void
}> {
  state = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error) {
    if (this.props.onError) {
      this.props.onError(error)
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}

// Import React for the ErrorBoundary class component
import React from "react"
