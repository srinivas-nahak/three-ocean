import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useLoader, useFrame } from "@react-three/fiber";
import { Water } from "three/examples/jsm/Addons.js";

const SimpleOcean = () => {
  const waterRef = useRef<THREE.Group>(null);
  const waterNormals = useLoader(
    THREE.TextureLoader,
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/waternormals.jpg"
  );

  useEffect(() => {
    if (waterRef.current) {
      // Ensure the texture repeats for seamless water normals
      waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

      // Create Water object
      const water = new Water(new THREE.PlaneGeometry(1000, 1000), {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: waterNormals,
        sunDirection: new THREE.Vector3(10, 1, 1).normalize(),
        sunColor: 0xffffff,
        waterColor: 0x024f83,
        distortionScale: 60,
      });

      // Add the water object to the group
      waterRef.current.add(water);
    }
  }, [waterNormals]);

  useFrame(() => {
    if (waterRef.current) {
      // Type assertion to tell TypeScript this is the Water object
      const water = waterRef.current.children[0] as Water;
      water.material.uniforms["time"].value -= 0.4 / 60.0;

      if (waterRef.current.position.y <= -5) {
        waterRef.current.position.x -= 0.005;
        waterRef.current.position.y += 0.001;
      } else {
        waterRef.current.position.x += 0.005;
        waterRef.current.position.y -= 0.001;
      }
    }
  });
  //   useFrame(({ clock }) => {
  //     const time = clock.getElapsedTime();

  //     if (waterRef.current?.children[0]) {
  //       const water = waterRef.current.children[0] as Water;
  //       if (water.material.uniforms) {
  //         water.material.uniforms["time"].value -= 0.07 / 60.0;
  //         water.material.uniforms["distortionScale"].value =
  //           Math.sin(time) * 5 + 10;

  //         water.material.uniforms["sunDirection"].value.set(
  //           Math.sin(time),
  //           1,
  //           Math.cos(time)
  //         );
  //       }
  //     }
  //   });

  // Adjust the position and rotation

  return (
    <group
      ref={waterRef}
      position={[0, -1, -5]}
      //position={[10, -5, -5]} // Move the water closer to the camera and below its line of sight
      rotation={[-Math.PI / 2, 0, 0]} // Ensure it's horizontal
    />
  );
};

export default SimpleOcean;
