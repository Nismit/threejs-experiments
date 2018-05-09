import * as bufferSpace from './bufferSpace';
import * as shaderSpace from './shaderSpace';

const init = () => {
  // bufferSpace.default();
  shaderSpace.default();
}

window.addEventListener('load', init);