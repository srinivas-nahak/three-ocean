import { useEffect } from "react";
import * as THREE from "three";
import {
  EffectComposer,
  RenderPass,
  UnrealBloomPass,
} from "three/examples/jsm/Addons.js";
import { useThree } from "@react-three/fiber";

const BloomEffect = () => {
  const { gl, camera, scene, size } = useThree();

  useEffect(() => {
    // Create the render pass (captures the scene and renders it to the composer)
    const renderScene = new RenderPass(scene, camera);

    // Create the bloom effect with customizable strength, radius, and threshold
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(size.width, size.height), // Resolution based on the size of the renderer
      3.5, // Bloom Strength
      0.4, // Bloom Radius (spread)
      2.5 // Bloom Threshold
    );

    // Set up the EffectComposer to apply the passes
    const composer = new EffectComposer(gl);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // Update the render loop to render the scene with the bloom effect
    const animate = () => {
      composer.render();
    };

    // Start the animation loop
    const frame = () => {
      animate();
      requestAnimationFrame(frame);
    };
    frame();

    // Cleanup composer on unmount
    return () => {
      //@ts-ignore
      scene.remove(composer);
    };
  }, [gl, camera, scene, size]);

  return null;
};

export default BloomEffect;
