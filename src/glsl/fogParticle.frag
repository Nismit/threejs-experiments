precision mediump float;
//uniform float time;
//uniform float opacity;
//uniform vec2 resolution;

uniform float time;
uniform float opacity;
uniform vec2 mouse;
uniform vec2 resolution;

void main()	{
  //float x = mod(time + gl_FragCoord.x, 20.) < 10. ? 1. : 0.;
  //float y = mod(time + gl_FragCoord.y, 20.) < 10. ? 1. : 0.;
  //gl_FragColor = vec4(vec3(min(x, y)), 1.0);

  vec2 position = (gl_FragCoord.xy / resolution.xy) + mouse / 3.0;

  //float color = 0.0;
  //color += sin(position.x * cos(time / 15.0) * 80.0) + cos(position.y * cos(time / 15.0) * 10.0);
  //color += sin(position.y * sin(time / 10.0) * 40.0) + cos(position.x * sin(time / 25.0) * 40.0);
  //color += sin(position.x * sin(time /  5.0) * 10.0) + sin(position.y * sin(time / 35.0) * 80.0);
  //color *= sin(time / 10.0) * 0.5;

  //vec3 newPos = vec3( 
  //  position.x * time + sin(time) + 10.0,
  //  position.y * time + cos(time) + 3.0,
  //  0.0
  //);

  // gl_FragColor = vec4(vec3(color, color * 0.5, sin(color + time / 3.0) * 0.75), 1.0);
  gl_FragColor = vec4(vec3(position.x, position.y, 0.0), 1.0);
}