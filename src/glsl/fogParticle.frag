precision mediump float;
//uniform float time;
//uniform float opacity;
//uniform vec2 resolution;

uniform float time;
uniform float opacity;
uniform vec2 mouse;
uniform vec2 resolution;

const int num_x = 10;
const int num_y = 10;
float w = resolution.x;
float h = resolution.y;

void main()	{
  //float x = mod(time + gl_FragCoord.x, 20.) < 10. ? 1. : 0.;
  //float y = mod(time + gl_FragCoord.y, 20.) < 10. ? 1. : 0.;
  //gl_FragColor = vec4(vec3(min(x, y)), 1.0);

  //vec2 position = (gl_FragCoord.xy / resolution.xy) + mouse / 4.0;

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
  // gl_FragColor = vec4(vec3(position.x, position.y, 0.0), 1.0);

  //float x = resolution.x / 2.0;
	//float y = resolution.y / 2.0;
	//float size = 5.0;
	//vec2  pos = vec2(x, y);
	//float dist = length(gl_FragCoord.xy - pos);
	//float color = size / dist;
	//gl_FragColor = vec4(vec3(color), 1.0);

  float size = 1.0 - 0.5 * sin(time * 10.0);
	float color = 0.0;
	for (int i = 0; i < num_x; ++i) {
		for (int j = 0; j < num_y; ++j) {
			float x = w/2.0 + (float(i-num_x/2)) * w/float(num_x);
			float y = h/2.0 + (float(j-num_y/2)) * h/float(num_y);
			vec2 pos = vec2(x, y);
			float dist = length(gl_FragCoord.xy - pos);
			color += pow(size/dist, 2.0);
		}
	}
	gl_FragColor = vec4(vec3(color), 1.0);
}