import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

export function LaserGun({ hand }) {
  const groupRef = useRef()
  const [shooting, setShooting] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  
  // Simple gun model (or you can use a GLTF model)
  // For a proper model, you'd use: const { nodes, materials } = useGLTF('/gun.glb')
  
  useFrame((state) => {
    if (!groupRef.current) return
    
    // Position gun in controller's hand
    if (hand === 'right') {
      groupRef.current.position.set(0.1, -0.1, -0.3)
      groupRef.current.rotation.set(0, Math.PI / 4, 0)
    } else {
      groupRef.current.position.set(-0.1, -0.1, -0.3)
      groupRef.current.rotation.set(0, -Math.PI / 4, 0)
    }
    
    // Cooldown timer
    if (cooldown > 0) {
      setCooldown(cooldown - 1)
    }
  })
  
  const shoot = () => {
    if (cooldown > 0) return
    
    setShooting(true)
    setCooldown(10) // 10 frames cooldown
    
    setTimeout(() => {
      setShooting(false)
    }, 100)
    
    // Return the gun's position and direction for the laser
    if (groupRef.current) {
      const position = new THREE.Vector3()
      const direction = new THREE.Vector3(0, 0, -1)
      groupRef.current.getWorldPosition(position)
      groupRef.current.getWorldDirection(direction)
      return { position, direction }
    }
    return null
  }
  
  return (
    <group ref={groupRef}>
      {/* Simple gun geometry - replace with a proper model */}
      <mesh castShadow>
        <boxGeometry args={[0.2, 0.05, 0.3]} />
        <meshStandardMaterial 
          color="#333" 
          metalness={0.9} 
          roughness={0.1}
        />
      </mesh>
      <mesh position={[0, 0, -0.15]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.2, 8]} />
        <meshStandardMaterial 
          color="#00ffff" 
          emissive="#00ffff" 
          emissiveIntensity={shooting ? 5 : 1}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Laser sight */}
      {!shooting && (
        <mesh position={[0, 0, -5]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.005, 0.005, 10, 8]} />
          <meshBasicMaterial color="#ff00ff" transparent opacity={0.5} />
        </mesh>
      )}
    </group>
  )
}
