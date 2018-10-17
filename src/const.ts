export const VENDOR_PREFIXES = [ '', 'o', 'ms', 'moz', 'webkit', 'webkitCurrent' ];

export const SYNONYMS = [
  [ '', '' ], // empty
  [ 'exit', 'cancel' ], // firefox & old webkits expect cancelFullScreen instead of exitFullscreen
  [ 'screen', 'Screen' ], // firefox expects FullScreen instead of Fullscreen
];

export const DESKTOP_FULLSCREEN_STYLE = {
  bottom: 0,
  height: '100%',
  left: 0,
  overflow: 'hidden',
  position: 'fixed',
  right: 0,
  top: 0,
  width: '100%',
  zIndex: '2147483647',
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
