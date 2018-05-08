// import * as space from './space';
import * as space from './bufferSpace';
// import * as space from './shaderSpace';
// import * as plane from './plane';
// import * as waves from './waves';
// import * as shader from './minimalShader';

const init = () => {
  space.default();
  // plane.default();
  // waves.default();
  // shader.default();
}

window.addEventListener('load', init);