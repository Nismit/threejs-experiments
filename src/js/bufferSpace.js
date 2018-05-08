import * as THREE from 'three';

export default function() {
  const _canvas     = document.getElementById('canvas'),
        _width      = (window.innerWidth || document.documentElement.clientWidth || 0),
        _height     = (window.innerHeight || document.documentElement.clientHeight || 0),
        renderer    = new THREE.WebGLRenderer({ canvas: _canvas, antialias: true, preserveDrawingBuffer: true }),
        scene       = new THREE.Scene(),
        camera      = new THREE.PerspectiveCamera(45, _width / _height, 1, 10000),
        backScene   = new THREE.Scene(),
        backCamera  = new THREE.OrthographicCamera(0, _width, _height, 0, 0, 1000),
        geometry    = new THREE.BufferGeometry();

  const NUM_PARTICLES = 1000; 

  const addGuide = (length = 10) => {
    scene.add( new THREE.AxesHelper(length) );
  }

  const generateParticle = () => {
    const position  = [],
          direction = [],
          colors    = [],
          color     = new THREE.Color();

    for(let i = 0; i < NUM_PARTICLES; i++) {
      const theta = (i / NUM_PARTICLES) * Math.PI * 2;

      position.push( 
        Math.cos(theta) * 100 + Math.random()*10,
        Math.sin(theta) * 100 + Math.random()*10,
        Math.random()*100
      );

      direction.push( 
        (Math.cos(theta) + Math.random()*2 -1),
        (Math.sin(theta) + Math.random()*2 -1),
        Math.random()*2
      );

      // color.setRGB( Math.random(), Math.random(), Math.random() );
      // colors.push( color );
      colors.push(
        Math.random(),
        Math.random(),
        Math.random()
      );
    }

    geometry.addAttribute('position',  new THREE.Float32BufferAttribute( position,  3) );
    geometry.addAttribute('direction', new THREE.Float32BufferAttribute( direction, 3) );
    geometry.addAttribute('color',     new THREE.Float32BufferAttribute( colors,    3) );
    // geometry.attributes.color.needsUpdate = true;
    // geometry.setDrawRange(0, 100);
  }

  const generateMaterial = () => {
    const texture = new THREE.Texture( generateCircle() );
    texture.needsUpdate = true;

    const material = new THREE.PointsMaterial({
      map: texture,
      size: 20,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthTest: false,
      vertexColors: THREE.VertexColors,
      fog: true,
      opacity: 0.8
    });

    material.needsUpdate = true;

    return material;
  }

  const fadeSystem = () => {
    const backGeometry = new THREE.PlaneGeometry(_width, _height, 10, 10);
    const backMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.3,
    });

    const background = new THREE.Mesh(backGeometry, backMaterial);
    background.position.x = _width / 2;
    background.position.y = _height / 2;

    return background;
  }

  const onUpdateScreen = () => { 
    const width =  (window.innerWidth || document.documentElement.clientWidth || 0),
          height = (window.innerHeight || document.documentElement.clientHeight || 0);
  
    _canvas.width = width;
    _canvas.height = height;
  
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
  
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  const resize = () => {
    window.addEventListener('resize', () => { setTimeout(onUpdateScreen, 300) });
  }

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

  const render = () => {

    let positions  = geometry.getAttribute('position').array,
        directions = geometry.getAttribute('direction').array;

    for(let i = 0; i < NUM_PARTICLES; i++) {
      const theta = (i / NUM_PARTICLES) * Math.PI * 2;

      positions[ i * 3 + 2 ] += directions[ i * 3 + 2 ] * 2.5;

      if(positions[ i * 3 + 2 ] > 700) {
        positions[ i * 3 ]      = Math.cos(theta)*100 + Math.random()*10;
        positions[ i * 3 + 1 ]  = Math.sin(theta)*100 + Math.random()*10;
        positions[ i * 3 + 2 ]  = Math.random()*100;
      }
    }
  
    geometry.attributes.position.needsUpdate = true;
  
    camera.lookAt(new THREE.Vector3(0, 0, 0));
  
    renderer.render(backScene, backCamera);
    renderer.render(scene, camera);
  }

  const renderLoop = () => {
    render();
    requestAnimationFrame( renderLoop );
  }

  const init = () => {
    _canvas.style.display = 'block';
    camera.position.set(0, 0, 700);

    // Set fade
    renderer.preserveDrawingBuffer  = true;
    renderer.autoClearColor         = false;

    generateParticle();

    backScene.add( fadeSystem() );
    scene.add( new THREE.Points( geometry, generateMaterial() ) );

    onUpdateScreen();
    resize();
    renderLoop();
  }
  init();

}
