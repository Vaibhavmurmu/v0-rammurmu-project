"use client"

import { useRef, useState, useEffect, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text3D, Float, PerspectiveCamera, Environment } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { ArrowRight, Download, Github, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useLanguage } from "@/context/language-context"
import * as THREE from "three"

function FloatingName() {
  const textRef = useRef<THREE.Mesh>(null)
  const [material, setMaterial] = useState<THREE.Material | null>(null)

  // Use a try-catch block to handle texture loading errors
  useEffect(() => {
    const loadMaterial = async () => {
      try {
        // Create a standard material with a nice color
        const normalMaterial = new THREE.MeshNormalMaterial()
        setMaterial(normalMaterial)
      } catch (error) {
        console.error("Failed to create material:", error)
        // Use a basic material as fallback
        const fallbackMaterial = new THREE.MeshBasicMaterial({ color: 0x5f4dee })
        setMaterial(fallbackMaterial)
      }
    }

    loadMaterial()
  }, [])

  useFrame(({ clock }) => {
    if (textRef.current) {
      textRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.1 + 0.1
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <Text3D
        ref={textRef}
        font="/fonts/Inter_Bold.json"
        size={0.5}
        height={0.1}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
        position={[-1.75, 0, 0]}
      >
        RAM MURMU
        {material && <primitive object={material} attach="material" />}
      </Text3D>
    </Float>
  )
}

// Loading fallback component
function LoadingText() {
  return (
    <Text3D font="/fonts/Inter_Bold.json" size={0.5} height={0.1} position={[-1.75, 0, 0]}>
      RAM MURMU
      <meshStandardMaterial color="#888888" />
    </Text3D>
  )
}

export default function Hero3D() {
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      {/* Background with blur effect */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-50 dark:opacity-30" />
        <div className="absolute inset-0 backdrop-blur-sm bg-background/50" />
      </div>

      <div className="container mx-auto px-4 py-20 pt-32 grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            {t("hero.greeting")}
          </motion.h1>

          {/* 3D Name */}
          <div className="h-24 md:h-32 w-full relative">
            <Canvas>
              <PerspectiveCamera makeDefault position={[0, 0, 5]} />
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <Suspense fallback={<LoadingText />}>
                <FloatingName />
              </Suspense>
              <Environment preset="city" />
            </Canvas>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-xl text-muted-foreground"
          >
            {t("hero.role")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <Button asChild size="lg" className="rounded-full group">
              <Link href="#contact">
                {t("hero.contact")}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full group">
              <Link href="/resume">
                <Download className="mr-2 h-4 w-4 transition-transform group-hover:translate-y-[-2px]" />
                View Resume
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex gap-4 pt-4"
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button asChild variant="ghost" size="icon" className="rounded-full">
                <a href="https://github.com/vaibhavmurmu" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button asChild variant="ghost" size="icon" className="rounded-full">
                <a href="https://linkedin.com/in/vaibhavmurmu" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button asChild variant="ghost" size="icon" className="rounded-full">
                <a href="https://x.com/vaibhavmurmu" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="relative mx-auto w-full max-w-md aspect-square"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-primary/40 blur-3xl -z-10"
          />
          <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-background shadow-xl">
            <Image src="/rammurmu.jpg" alt="Vaibhav Murmu" fill className="object-cover" priority />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
