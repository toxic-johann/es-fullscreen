document.fullscreenEnabled = true;
document.fullscreenElement = null;
function exitFullscreen () {
  document.fullscreenElement = null;
  document.dispatchEvent(new Event('fullscreenchange'));
}
document.exitFullscreen = document.exitFullscreen || exitFullscreen;
document.body.exitFullscreen = document.body.exitFullscreen || exitFullscreen;
document.body.requestFullscreen = document.requestFullscreen || (() => {
  document.fullscreenElement = document.body;
  document.dispatchEvent(new Event('fullscreenchange'));
});
import tester from './base';
const esFullscreen = require('../src/index.js').default;
tester(esFullscreen);
