document.fullscreenEnabled = true;
document.fullscreenElement = null;
function exitFullscreen() {
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

describe('use native to test', () => {
  tester(esFullscreen);
});

describe('use style event when native is supported', () => {
  beforeAll(() => {
    esFullscreen.useStyleFirst = true;
  });

  tester(esFullscreen);

  afterAll(() => {
    esFullscreen.useStyleFirst = false;
  });
});

