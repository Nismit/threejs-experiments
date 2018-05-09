precision mediump float;
varying vec3 vColor;

void main() {
  vColor = color;
  gl_PointSize = 25.0;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}