import AnimatedText from "../AnimatedText/AnimatedText";
import styles from "./CenterText.module.css";

const CenterText = () => {
  // useEffect(() => {
  //   if (centerTextRef.current) {
  //     gsap.to(centerTextRef.current, {
  //       y: 15, // Move 20 pixels up and down
  //       duration: 1.5,
  //       repeat: -1, // Repeat infinitely
  //       yoyo: true, // Move up and down (ping-pong effect)
  //       ease: "power1.inOut", // Smooth easing
  //     });
  //   }
  // }, []);

  return (
    <div className={styles["center-text-parent"]}>
      <AnimatedText
        el="h1"
        text="What we know about carbon capture in the ocean"
      />
      <p>Please click anywhere on the screen to play the audio.</p>
    </div>
  );
};

export default CenterText;

{
  /* <Html as="div" center className={styles["center-text-parent"]}>
  <AnimatedText el="h1" text="What we know about carbon capture in the ocean" />
  <p>Please click anywhere on the screen to play the audio.</p>
</Html>; */
}
