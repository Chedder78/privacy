import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { XR, ARButton, Controllers } from '@react-three/xr'
import { Sky, Text } from '@react-three/drei'
import { GameScene } from './GameScene'
import './App.css'

export default function App() {
  const [gameStarted, setGameStarted] = useState(false)
  const [score, setScore] = useState(0)

  return (
    <div className="app">
      <div className="ui">
        {!gameStarted ? (
          <div className="start-screen">
            <h1>NEON HUNT</h1>
            <p>An AR Cyberpunk Adventure</p>
            <ARButton 
              className="ar-button"
              sessionInit={{
                requiredFeatures: ['hit-test'],
              }}
              onClick={() => setGameStarted(true)}
            >
              ENTER THE NEON ZONE
            </ARButton>
          </div>
        ) : (
          <div className="score-display">SCORE: {score}</div>
        )}
      </div>

      {gameStarted && (
        <Canvas>
          <XR>
            <ambientLight intensity={0.5} />
            <Controllers />
            <GameScene setScore={setScore} />
          </XR>
        </Canvas>
      )}
    </div>
  )
}
