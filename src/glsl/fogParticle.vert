//precision mediump float;
//uniform float time;
//uniform float opacity;
//uniform vec2 resolution;

void main()	{
  //vec3 newPos = vec3( 
  //  position.x * time + sin(time*100.0) + 10.0,
  //  position.y * time + cos(time*10.0) + 3.0,
  //  position.z
  //);

  gl_PointSize = 5.0;
  //gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}