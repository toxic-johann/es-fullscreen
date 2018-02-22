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

  const button = document.getElementById('method-switch');

  function setButtonText() {
    const text = esFullscreen.useStyleFirst
      ? 'use native'
      : 'use style';
    button.innerText = text;
  }

  if (esFullscreen.isNativelySupport) {
    button.addEventListener('click', () => {
      esFullscreen.useStyleFirst = !esFullscreen.useStyleFirst;
      setButtonText();
    });
    document.addEventListener('esfullscreenmethodchange', setButtonText);
  } else {
    button.style.display = 'none';
  }
}, 1000);
esFullscreen.on('fullscreenchange', evt => {
  const pre = document.createElement('pre');
  pre.innerText = `${evt.type}: Now the page is ${esFullscreen.isFullscreen ? '' : 'not '}fullscreen.`;
  document.getElementById('events').appendChild(pre);
});
window.esFullscreen = esFullscreen;
