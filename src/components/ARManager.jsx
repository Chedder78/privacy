import { useEffect, useState } from 'react'
import { MindARThree } from 'mindar-image-three'
import * as THREE from 'three'

export default function ARManager() {
  const [started, setStarted] = useState(false)
  
  useEffect(() => {
    const startAR = async () => {
      const mindarThree = new MindARThree({
        container: document.getElementById('ar-container'),
        imageTargetSrc: './targets/target.mind', // Marker file
      })
      
      const { renderer, scene, camera } = mindarThree
      const anchor = mindarThree.addAnchor(0)
      
      // Add lights (essential for AR)
      const ambientLight = new THREE.AmbientLight(0xffffff, 1)
      scene.add(ambientLight)
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
      directionalLight.position.set(0, 1, 0)
      scene.add(directionalLight)
      
      // This is where we'll add our underwater world
      anchor.group.position.set(0, -0.4, 0) // Adjust for better positioning
      
      await mindarThree.start()
      renderer.setAnimationLoop(() => {
        renderer.render(scene, camera)
      })
      
      setStarted(true)
      
      return () => {
        renderer.setAnimationLoop(null)
        mindarThree.stop()
      }
    }
    
    startAR()
  }, [])

  return (
    <div id="ar-container" style={{ width: '100%', height: '100%' }}>
      {!started && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          textAlign: 'center'
        }}>
          <p>Loading AR...</p>
          <p>Point your camera at the marker</p>
        </div>
      )}
    </div>
  )
}
