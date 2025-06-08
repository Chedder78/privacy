import { Canvas } from '@react-three/fiber'
import { ARScene } from './components/ARScene'

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ARScene />
      </Canvas>
    </div>
  )
}
