export const VENDOR_PREFIXES = [ '', 'o', 'ms', 'moz', 'webkit', 'webkitCurrent' ];

export const SYNONYMS = [
  [ '', '' ], // empty
  [ 'exit', 'cancel' ], // firefox & old webkits expect cancelFullScreen instead of exitFullscreen
  [ 'screen', 'Screen' ], // firefox expects FullScreen instead of Fullscreen
];

export const DESKTOP_FULLSCREEN_STYLE = {
  position: 'fixed',
  zIndex: '2147483647',
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  overflow: 'hidden',
  width: '100%',
  height: '100%',
};

export const FULLSCREEN_CHANGE = [
  'fullscreenchange',
  'webkitfullscreenchange',
  'mozfullscreenchange',
  'MSFullscreenChange',
];

export const FULLSCREEN_ERROR = [
  'fullscreenerror',
  'webkitfullscreenerror',
  'mozfullscreenerror',
  'MSFullscreenError',
];
