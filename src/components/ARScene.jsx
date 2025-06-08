import { useFrame } from '@react-three/fiber'
import { Environment, Float } from '@react-three/drei'
import { Jellyfish } from './Jellyfish'

export function ARScene() {
  useFrame((state) => {
    // Gentle underwater movement
    state.scene.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.02
  })

  return (
    <>
      <Environment preset="night" />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#44ccff" />
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Jellyfish position={[0, 0, 0]} />
      </Float>
    </>
  )
}
