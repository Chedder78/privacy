import { useEffect } from 'react'
import { MindARThree } from 'mindar-image-three'

export function ARScene() {
  useEffect(() => {
    const mindarThree = new MindARThree({
      container: document.body,
      imageTargetSrc: './targets.mind' // we'll create this
    })
    
    const { renderer, scene, camera } = mindarThree
    const anchor = mindarThree.addAnchor(0)
    
    // Add your 3D content to anchor.group
    anchor.group.add(/* your objects */)
    
    const start = async () => {
      await mindarThree.start()
      renderer.setAnimationLoop(() => {
        renderer.render(scene, camera)
      })
    }
    start()
    
    return () => {
      renderer.setAnimationLoop(null)
      mindarThree.stop()
    }
  }, [])
  
  return null
}
