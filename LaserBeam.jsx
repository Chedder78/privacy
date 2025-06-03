import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function LaserBeam({ start, direction, onHit, active = true }) {
  const ref = useRef()
  const raycaster = new THREE.Raycaster()
  const endPoint = new THREE.Vector3()
  
  useFrame((state) => {
    if (!ref.current || !active) return
    
    // Update laser position
    endPoint.copy(start).add(direction.multiplyScalar(100))
    ref.current.position.copy(start)
    ref.current.lookAt(endPoint)
    
    // Raycasting for hits
    raycaster.set(start, direction)
    const intersects = raycaster.intersectObjects(state.scene.children, true)
    
    if (intersects.length > 0) {
      const hit = intersects[0]
      // Check if we hit a target
      if (hit.object.userData.isTarget && onHit) {
        onHit(hit.object.userData.targetId)
      }
    }
  })
  
  return (
    <mesh ref={ref}>
      <cylinderGeometry args={[0.01, 0.01, 100, 8]} />
      <meshBasicMaterial 
        color="#ff00ff" 
        transparent 
        opacity={0.8} 
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}
