import { OrbitControls, PositionalAudio } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import Birds from "./components/Birds";
import BloomEffect from "./components/BloomEffect";
import CanvasLoader from "./components/CanvasLoader/CanvasLoader";
import CenterText from "./components/CenterText/CenterText";
import SimpleOcean from "./components/SimpleOcean";
import SunsetSky from "./components/SunsetSky";
import { birdPositions } from "./utils/birdPosition";

const App = () => {
  //const isMobile = useMediaQuery({ maxWidth: 768 });
  const audioRef = useRef<THREE.PositionalAudio>(null);
  const isAudioEnabled = useRef(false); // Tracks if audio has been enabled

  const enableAudio = () => {
    if (!isAudioEnabled.current && audioRef.current) {
      if (audioRef.current.context.state === "suspended") {
        audioRef.current.context.resume().then(() => {
          isAudioEnabled.current = true; // Mark audio as enabled
        });
      } else {
        isAudioEnabled.current = true; // Mark audio as enabled
      }
    }
  };

  const canvasClickHandler = () => {
    if (audioRef.current) {
      if (audioRef.current.isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  return (
    <>
      <CenterText />
      <Canvas
        onPointerDown={enableAudio}
        onClick={canvasClickHandler}
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        gl={{
          antialias: true, // Enable anti-aliasing
          alpha: true, // Optional: Make the canvas background transparent
        }}
        // camera={{
        //   position: [0, 0, 0], // Position the camera above and angled toward the water
        //   fov: 100, // Field of view
        //   near: 0.1,
        //   far: 1000,
        // }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            enableDamping={true}
            dampingFactor={0.05}
            maxAzimuthAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
            enablePan={false}
          />
          <PositionalAudio
            ref={audioRef} // Optional ref if you need access to the audio
            url="/sounds/ocean-sound.mp3" // Path to your audio file
            distance={2} // Maximum distance for audio
            loop // Enable looping
          />
          {birdPositions.map((item, index) => (
            <Birds
              key={index}
              position={new THREE.Vector3(...item.position)}
              rotation={new THREE.Euler(...item.rotation)}
            />
          ))}
          <BloomEffect />
          <SunsetSky />
          <SimpleOcean />
        </Suspense>
      </Canvas>
    </>
  );
};

export default App;
