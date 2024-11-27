uniform float time;
uniform sampler2D waterNormals;
varying vec2 vUv;

void main() {
  vUv = uv;

  // Apply sine wave displacement to simulate ripples
  vec3 newPosition = position;
  float wave = sin(position.x * 0.1 + time) * 2.0 + sin(position.y * 0.1 + time) * 2.0;
  newPosition.z += wave;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
