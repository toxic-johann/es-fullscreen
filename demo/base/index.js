const esFullscreen = window.esFullscreen;
[1, 2].forEach(key => {
  document.getElementById('node' + key)
  .addEventListener('click', ({target}) => {
    if(esFullscreen.isFullScreen) {
      esFullscreen.exit();
    } else {
      esFullscreen.open(target);
    }
  });
});
