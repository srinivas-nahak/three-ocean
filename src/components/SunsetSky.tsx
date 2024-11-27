import { useEffect } from "react";
import * as THREE from "three";
import { Sky } from "three/examples/jsm/objects/Sky.js";
import { useThree } from "@react-three/fiber";

const SunsetSky = () => {
  const { scene, gl } = useThree();

  useEffect(() => {
    // Create the sky
    const sky = new Sky();
    sky.scale.setScalar(10000);
    scene.add(sky);

    const sun = new THREE.Vector3();

    // Sunset configuration
    const effectController = {
      turbidity: 110,
      rayleigh: 3,
      mieCoefficient: 0.005,
      mieDirectionalG: 1.8,
      elevation: -0.1, // Sunset position
      azimuth: 180, // Sunset angle
    };

    // Create a sphere to represent the sun
    // const sunMesh = new THREE.Mesh(
    //   new THREE.SphereGeometry(10, 32, 32), // Increase radius for larger sun
    //   new THREE.MeshLambertMaterial({
    //     color: 0xf9e6b7, // Sun color
    //     emissive: 0xf9e6b7, // To make it glow
    //     emissiveIntensity: 2, // Adjust the glow intensity
    //   })
    // );
    // scene.add(sunMesh);

    const updateSun = () => {
      const phi = THREE.MathUtils.degToRad(90 - effectController.elevation);
      const theta = THREE.MathUtils.degToRad(effectController.azimuth);

      sun.setFromSphericalCoords(1, phi, theta);
      sky.material.uniforms["sunPosition"].value.copy(sun);

      // Position the sun mesh (make it appear in the right place)
      //sunMesh.position.copy(sun.clone().multiplyScalar(100));

      // Update the renderer's tone mapping for the sunset effect
      gl.toneMappingExposure = 0.35;
    };

    updateSun();

    // Cleanup
    return () => {
      scene.remove(sky);
      //scene.remove(sunMesh); // Clean up sun mesh
    };
  }, [scene, gl]);

  return null;
};

export default SunsetSky;
