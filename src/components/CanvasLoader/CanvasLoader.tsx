import { Html } from "@react-three/drei";
import styles from "./CanvasLoader.style.module.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const CanvasLoader = () => {
  //const { progress } = useProgress();

  //https://lottie.host/cfe6cdd1-4848-47ab-98d3-61be2e053eec/cM3Jt6d4Oh.lottie

  return (
    <Html as="div" center className={styles["canvas-loader-parent"]}>
      <DotLottieReact
        src="https://lottie.host/cfe6cdd1-4848-47ab-98d3-61be2e053eec/cM3Jt6d4Oh.lottie"
        loop
        autoplay
        speed={2}
        style={{ opacity: 0.6 }}
      />
      {/* <p>{progress !== 0 ? `${Math.round(progress)}%` : "Loading..."}</p> */}
    </Html>
  );
};

export default CanvasLoader;
