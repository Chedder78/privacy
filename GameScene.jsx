import { useState, useEffect, useRef } from 'react'
import { useFrame, useXR } from '@react-three/xr'
import { Text, Float, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { useAudio } from './useAudio'

const TARGET_COUNT = 5
const GAME_DURATION = 60 // seconds

export function GameScene({ setScore }) {
  const { player } = useXR()
  const [targets, setTargets] = useState([])
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION)
  const [gameOver, setGameOver] = useState(false)
  const scoreRef = useRef(0)
  
  // Cyberpunk textures
  const neonTexture = useTexture({
    map: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxTextured/glTF/BoxTextured0_baseColor.png',
    emissiveMap: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxTextured/glTF/BoxTextured0_baseColor.png'
  })
  
  // Audio effects
  const { playTargetSound, playBackgroundMusic } = useAudio()
  
  useEffect(() => {
    playBackgroundMusic()
    
    // Initialize targets
    const initialTargets = []
    for (let i = 0; i < TARGET_COUNT; i++) {
      initialTargets.push(createTarget())
    }
    setTargets(initialTargets)
    
    // Game timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          setGameOver(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [])
  
  const createTarget = () => {
    // Position targets in a circle around the player
    const angle = Math.random() * Math.PI * 2
    const distance = 1 + Math.random() * 3
    const height = -0.5 + Math.random() * 1.5
    
    return {
      id: Math.random().toString(36).substring(7),
      position: [
        Math.cos(angle) * distance,
        height,
        -Math.sin(angle) * distance
      ],
      scale: [0.3, 0.3, 0.3],
      color: new THREE.Color(
        Math.random() * 0.5 + 0.5, // R (pink/purple range)
        Math.random() * 0.3,       // G
        Math.random() * 0.5 + 0.5  // B (blue range)
      ),
      speed: 0.5 + Math.random() * 2,
      direction: new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      ).normalize(),
      hit: false
    }
  }
  
  const handleTargetHit = (id) => {
    playTargetSound()
    setTargets(prev => prev.filter(t => t.id !== id))
    scoreRef.current += 100
    setScore(scoreRef.current)
    
    // Add new target after a delay
    setTimeout(() => {
      setTargets(prev => [...prev, createTarget()])
    }, 1000)
  }
  
  useFrame(() => {
    if (gameOver) return
    
    // Update target positions
    setTargets(prev => prev.map(target => {
      if (target.hit) return target
      
      // Move target
      const newPosition = [
        target.position[0] + target.direction.x * 0.01 * target.speed,
        target.position[1] + target.direction.y * 0.01 * target.speed,
        target.position[2] + target.direction.z * 0.01 * target.speed
      ]
      
      // Simple boundary check
      if (Math.abs(newPosition[0]) > 5 || 
          Math.abs(newPosition[1]) > 3 || 
          Math.abs(newPosition[2]) > 5) {
        // Change direction
        return {
          ...target,
          direction: new THREE.Vector3(
            Math.random() - 0.5,
            Math.random() - 0.5,
            Math.random() - 0.5
          ).normalize()
        }
      }
      
      return {
        ...target,
        position: newPosition
      }
    }))
  })
  
  return (
    <>
      {/* Cyberpunk environment */}
      <ambientLight intensity={0.3} color="#ff00ff" />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
      <pointLight position={[-10, 10, -10]} intensity={1} color="#ff00ff" />
      
      {/* Grid floor */}
      <gridHelper args={[10, 10, '#00ffff', '#ff00ff']} rotation-x={-Math.PI / 2} />
      
      {/* Targets */}
      {targets.map((target) => (
        <Float key={target.id} speed={target.speed} rotationIntensity={2} floatIntensity={2}>
          <mesh
            position={target.position}
            scale={target.scale}
            onClick={() => handleTargetHit(target.id)}
          >
            <icosahedronGeometry args={[0.3, 0]} />
            <meshStandardMaterial 
              {...neonTexture}
              color={target.color}
              emissive={target.color}
              emissiveIntensity={2}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        </Float>
      ))}
      
      {/* Game over screen */}
      {gameOver && (
        <Text
          position={[0, 0, -2]}
          fontSize={0.4}
          color="#00ffff"
          anchorX="center"
          anchorY="middle"
        >
          GAME OVER\nSCORE: {scoreRef.current}
        </Text>
      )}
      
      {/* Timer display */}
      <Text
        position={[0, 1.5, -2]}
        fontSize={0.2}
        color="#ff00ff"
        anchorX="center"
        anchorY="middle"
      >
        TIME: {timeLeft}
      </Text>
    </>
  )
}
