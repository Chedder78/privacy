useEffect(() => {
  const startAR = async () => {
    const mindarThree = new MindARThree({ /* config */ });
    const { renderer, scene, camera } = mindarThree;
    const anchor = mindarThree.addAnchor(0);

    // ✅ Best approach: R3F inside anchor.group
    anchor.group.add(
      <>
        <ambientLight intensity={0.5} color="#44ccff" />
        <pointLight position={[10, 10, 10]} color="#88eeff" />
        
        <Suspense fallback={null}>
          <Jellyfish scale={[0.5, 0.5, 0.5]} />
          <KoiDragon position={[-1, 0, 0]} />
        </Suspense>
      </>
    );

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  };
  startAR();
}, []);
