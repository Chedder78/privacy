// src/scenes/UnderwaterWorld.jsx
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, Float } from '@react-three/drei';
import { useAR } from '../utils/ARContext';
import { Jellyfish } from '../creatures/Jellyfish';
import { KoiDragon } from '../creatures/KoiDragon';

export function UnderwaterWorld() {
  const { markers } = useAR();
  const { scene } = useThree();
  
  // Load main Atlantis model
  const atlantisModel = useGLTF('/models/atlantis_bathhouse.glb');
  
  useFrame((state) => {
    // Add gentle underwater movement
    scene.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.02;
    scene.position.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
  });

  return (
    <>
      <Environment files="/textures/underwater.hdr" background />
      
      {markers.map((marker) => (
        <group position={marker.position} key={marker.id}>
          <primitive object={atlantisModel.scene} scale={[0.5, 0.5, 0.5]} />
          
          <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <Jellyfish position={[2, 1, 0]} />
            <KoiDragon position={[-2, 0.5, 1]} />
          </Float>
        </group>
      ))}
    </>
  );
}
