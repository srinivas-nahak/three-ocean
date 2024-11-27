import { useEffect } from "react";
import * as THREE from "three";
import { Sky } from "three/examples/jsm/objects/Sky.js";
import { useThree } from "@react-three/fiber";
import {
  EffectComposer,
  RenderPass,
  UnrealBloomPass,
} from "three/examples/jsm/Addons.js";

const BlurredSunSky = () => {
  const { scene, gl, camera } = useThree();

  useEffect(() => {
    // Create the sky
    const sky = new Sky();
    sky.scale.setScalar(10000);
    scene.add(sky);

    const sun = new THREE.Vector3();

    // Sunset configuration
    const effectController = {
      turbidity: 10,
      rayleigh: 3,
      mieCoefficient: 0.005,
      mieDirectionalG: 1.8,
      elevation: 1, // Sunset position
      azimuth: 180, // Sunset angle
    };

    // Create the bloom effect
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5, // Strength of the bloom
      0.4, // Radius (spread) of the bloom
      0.85 // Threshold for blooming
    );

    const composer = new EffectComposer(gl);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // Create a sphere to represent the sun (same as before)
    const sunMesh = new THREE.Mesh(
      new THREE.SphereGeometry(10, 32, 32),
      new THREE.MeshLambertMaterial({
        color: 0xffffff, // Sun color
        emissive: 0xffffff, // Sun glow
        emissiveIntensity: 2, // Glow intensity
      })
    );
    scene.add(sunMesh);

    const updateSun = () => {
      const phi = THREE.MathUtils.degToRad(90 - effectController.elevation);
      const theta = THREE.MathUtils.degToRad(effectController.azimuth);

      sun.setFromSphericalCoords(1, phi, theta);
      sky.material.uniforms["sunPosition"].value.copy(sun);

      // Position the sun mesh
      sunMesh.position.copy(sun.clone().multiplyScalar(100));

      // Update the renderer's tone mapping for the sunset effect
      gl.toneMappingExposure = 0.4;
    };

    updateSun();

    // Animation loop
    const animate = () => {
      composer.render();
    };

    // Start animation loop
    const frame = () => {
      animate();
      requestAnimationFrame(frame);
    };
    frame();

    // Cleanup
    return () => {
      scene.remove(sky);
      scene.remove(sunMesh);
      //@ts-ignore
      scene.remove(composer);
    };
  }, [scene, gl]);

  return null;
};

export default BlurredSunSky;
