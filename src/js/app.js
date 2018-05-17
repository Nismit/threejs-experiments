import * as bufferSpace from './bufferSpace';
import * as shaderSpace from './shaderSpace';
import * as fogParticle from './fogParticle';

const init = () => {
  // bufferSpace.default();
  // shaderSpace.default();
  fogParticle.default();
}

window.addEventListener('load', init);