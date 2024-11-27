uniform sampler2D waterNormals;
uniform vec3 sunColor;
uniform vec3 waterColor;
uniform vec3 sunDirection;
uniform float time;

varying vec2 vUv;

void main() {
  // Sample the normal map for ripple effect
  vec3 normal = texture2D(waterNormals, vUv + time * 0.02).rgb * 2.0 - 1.0;

  // Simulate light interaction
  vec3 lightDir = normalize(sunDirection);
  float lightIntensity = max(dot(normal, lightDir), 0.0);

  // Blend water and light colors
  vec3 color = mix(waterColor, sunColor, lightIntensity);

  gl_FragColor = vec4(color, 1.0);
}
