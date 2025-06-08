import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export function Jellyfish({ position }) {
  const group = useRef()
  
  useFrame((state) => {
    group.current.rotation.y = state.clock.elapsedTime * 0.3
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
  })

  return (
    <group ref={group} position={position}>
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial 
          color="#ff99cc" 
          emissive="#ff66aa"
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  )
}
