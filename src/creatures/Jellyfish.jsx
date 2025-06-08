// src/creatures/Jellyfish.jsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export function Jellyfish({ position }) {
  const group = useRef();
  const { nodes, materials } = useGLTF('/models/jellyfish.glb');
  
  useFrame((state) => {
    // Pulsing animation
    group.current.scale.x = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.1;
    group.current.scale.y = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.1;
    
    // Gentle floating
    group.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
  });

  return (
    <group ref={group} position={position}>
      <mesh
        geometry={nodes.body.geometry}
        material={materials.transparent}
        rotation={[0, Math.PI / 4, 0]}
      >
        <meshStandardMaterial 
          color="#ff99cc" 
          emissive="#ff66aa" 
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </mesh>
      {/* Mask face that appears occasionally */}
      <mesh
        geometry={nodes.face.geometry}
        material={materials.face}
        visible={false} // Only show sometimes
      />
    </group>
  );
}
