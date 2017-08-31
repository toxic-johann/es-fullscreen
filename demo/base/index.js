const esFullscreen = window.esFullscreen;
[1, 2].forEach(key => {
  document.getElementById('node' + key)
  .addEventListener('click', ({target}) => {
    if(esFullscreen.isFullscreen) {
      esFullscreen.exit();
    } else {
      esFullscreen.open(target);
    }
  });
});

esFullscreen.on('fullscreenchange', evt => {
  const pre = document.createElement('pre');
  pre.innerText = `${evt.type}: Now the page is ${esFullscreen.isFullscreen ? '' : 'not '} fullscreen.`;
  document.getElementById('events').appendChild(pre);
});
