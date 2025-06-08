// src/components/TreasureChest.jsx
import { useState, useRef } from 'react';
import { useGLTF, Html } from '@react-three/drei';

export function TreasureChest({ position }) {
  const [isOpen, setIsOpen] = useState(false);
  const group = useRef();
  const { nodes, materials } = useGLTF('/models/treasure_chest.glb');

  return (
    <group 
      ref={group} 
      position={position}
      onClick={() => setIsOpen(!isOpen)}
    >
      <primitive 
        object={nodes.chest} 
        rotation-y={isOpen ? -Math.PI/3 : 0}
      />
      
      {isOpen && (
        <Html distanceFactor={10} position={[0, 0.5, 0]}>
          <div className="treasure-popup">
            <h3>Magical Pearl</h3>
            <p>A gift from the River Spirit</p>
          </div>
        </Html>
      )}
    </group>
  );
}
