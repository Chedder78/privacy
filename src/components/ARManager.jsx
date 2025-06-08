import { useEffect } from 'react';
import { MindARThree } from 'mindar-image-three';
import * as THREE from 'three';

export default function ARManager() {
  useEffect(() => {
    const startAR = async () => {
      // 1. Initialize
      const mindarThree = new MindARThree({
        container: document.getElementById('ar-container'),
        imageTargetSrc: '/targets/target.mind',
      });

      // 2. Get Three.js objects
      const { renderer, scene, camera } = mindarThree;
      const anchor = mindarThree.addAnchor(0);

      // 3. Add minimal test object
      const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
      const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      const cube = new THREE.Mesh(geometry, material);
      anchor.group.add(cube);

      // 4. Start AR
      await mindarThree.start();
      renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
      });

      return () => {
        renderer.setAnimationLoop(null);
        mindarThree.stop();
      };
    };

    startAR().catch(console.error);
  }, []);

  return <div id="ar-container" style={{ width: '100%', height: '100%' }} />;
}
