import * as THREE from 'three';
import glslify from 'glslify';

export default function() {
  const _canvas     = document.getElementById('canvas'),
        _width      = (window.innerWidth || document.documentElement.clientWidth || 0),
        _height     = (window.innerHeight || document.documentElement.clientHeight || 0),
        renderer    = new THREE.WebGLRenderer({ canvas: _canvas, antialias: true, preserveDrawingBuffer: true }),
        scene       = new THREE.Scene(),
        camera      = new THREE.PerspectiveCamera(45, _width / _height, 1, 10000),
        geometry    = new THREE.BufferGeometry(),
        material    = new THREE.ShaderMaterial(),
        time        = new THREE.Clock();

  let mousePos = {
    x: _width / 4,
    y: _height / 4
  };

  const generateCircle = () => {

    const canvas  = document.createElement( 'canvas' );
    canvas.width  = 16;
    canvas.height = 16;
  
    const context = canvas.getContext( '2d' );
  
    const gradient = context.createRadialGradient( canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2 );
    gradient.addColorStop( 0, 'rgba(255,255,255,1)' );
    gradient.addColorStop( 0.2, 'rgba(0,255,255,1)' );
    gradient.addColorStop( 0.4, 'rgba(0,0,64,1)' );
    gradient.addColorStop( 1, 'rgba(0,0,0,1)' );
  
    context.fillStyle = gradient;
    context.fillRect( 0, 0, canvas.width, canvas.height );
  
    return canvas;
  }

  const PARTICLES = 20000;

  const startTime   = Date.now();
  const speed  = Math.PI * 2 / 5000;

  const uniforms = {
    time:       { value: 1.0 },
    opacity:    { value: 1.0 },
    mouse:      { value: new THREE.Vector2() },
    resolution: { value: new THREE.Vector2() }
  };

  const generateParticle = () => {
    const positions  = [];

    for(let i = 0; i < PARTICLES; i++) {
      const theta = (i / PARTICLES) * Math.PI * 2;
      positions.push(
        Math.cos(theta)*70 + Math.random()*10,
        Math.sin(theta)*70 + Math.random()*10,
        Math.random()*30
      );
    }

    geometry.addAttribute('position',  new THREE.Float32BufferAttribute( positions,  3) );
  }

  const generateMaterial = () => {
    // const texture       = new THREE.Texture( generateCircle() );
    // texture.needsUpdate = true;

    // const uniforms = {
    //   time:     { value: 1.0 },
    //   // texture:  { value: texture }
    // }

    

    material.vertexShader   = require('../glsl/fogParticle.vert');
    material.fragmentShader = require('../glsl/fogParticle.frag');
    material.uniforms       = uniforms;
    material.transparent    = true;
    material.depthTest      = false;
    material.fog            = true;
    // material.opacity        = 0.0;
    material.blending       = THREE.AdditiveBlending;
    material.vertexColors   = THREE.VertexColors;
    // material.alphaTest      = 0.5;

  }

  const onUpdateScreen = () => { 
    const width =  (window.innerWidth || document.documentElement.clientWidth || 0),
          height = (window.innerHeight || document.documentElement.clientHeight || 0);
  
    _canvas.width = width;
    _canvas.height = height;
  
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    uniforms.resolution.value.x = renderer.domElement.width;
    uniforms.resolution.value.y = renderer.domElement.height;
  
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  const resize = () => {
    window.addEventListener('resize', () => { setTimeout(onUpdateScreen, 300) });
  }

  const onUpdateMousePosition = e => {
    const element = renderer.domElement,
          rect    = element.getBoundingClientRect();

    uniforms.mouse.value.x = (e.clientX - rect.left) / element.clientWidth  *  2 - 1;
    uniforms.mouse.value.y = (e.clientY - rect.top)  / element.clientHeight * -2 + 1;

    mousePos.x = (e.clientX - rect.left) / element.clientWidth;
    mousePos.y = (e.clientY - rect.top) / element.clientHeight;

    // console.log('Updated:', mousePos);
    
    // console.log('Mouse x value: ', uniforms.mouse.value.x);
    // console.log('Mouse y value: ', uniforms.mouse.value.y);
  }

  const mouse = () => {
    renderer.domElement.addEventListener('mousemove', onUpdateMousePosition);
  }

  const render = () => {

    let positions  = geometry.getAttribute('position').array;

    for(let i = 0; i < PARTICLES; i++) {
      const theta = (i / PARTICLES) * Math.PI * 2;
      positions[ i * 3 + 2 ] += time.getElapsedTime() * 0.1 * Math.random()*10;

      // if(mousePos.x !== null && mousePos.y !== null) {
        // positions[ i * 3 ] = mousePos.x;
        // positions[ i * 3 + 1 ] = mousePos.y;
      // }

      if(positions[ i * 3 + 2 ] > 700) {
        positions[ i * 3 ]      = Math.cos(theta)*70 + Math.random()*10;
        positions[ i * 3 + 1 ]  = Math.sin(theta)*70 + Math.random()*10;
        positions[ i * 3 + 2 ]  = Math.random()*30;
        //positions[ i * 3 + 2 ]  = 0;
      }
    }
  
    geometry.attributes.position.needsUpdate = true;
    
    uniforms.time.value = time.getElapsedTime() * 0.01;

    // console.log( time.getElapsedTime() * 0.001 );
  
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    renderer.render(scene, camera);
  }

  const renderLoop = () => {
    render();
    requestAnimationFrame( renderLoop );
  }

  const init = () => {
    _canvas.style.display = 'block';
    camera.position.set(0, 0, 700);

    generateParticle();
    generateMaterial();

    scene.add( new THREE.Points( geometry, material ) );
    // scene.add( new THREE.Mesh( geometry, material ) );
    // scene.add( new THREE.Mesh( new THREE.PlaneGeometry( 2, 2 ), material ) );
    
    onUpdateScreen();
    resize();
    mouse();

    console.log(mousePos);

    renderLoop();
  }
  init();

}
