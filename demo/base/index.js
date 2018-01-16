import 'babel-polyfill';
import esFullscreen from '../../src/index.js';
setTimeout(() => {
  [ 1, 2 ].forEach(key => {
    document.getElementById('node' + key)
      .addEventListener('click', ({ target }) => {
        if (esFullscreen.isFullscreen) {
          esFullscreen.exit();
        } else {
          esFullscreen.open(target);
        }
      });
  });
}, 1000);
esFullscreen.on('fullscreenchange', evt => {
  const pre = document.createElement('pre');
  pre.innerText = `${evt.type}: Now the page is ${esFullscreen.isFullscreen ? '' : 'not '}fullscreen.`;
  document.getElementById('events').appendChild(pre);
});
window.esFullscreen = esFullscreen;
