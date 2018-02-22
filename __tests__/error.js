import esFullscreen from '../src/index';
describe('error check', () => {
  describe('on/off', () => {
    test('only can handle fullscreenchange and fullscreenerror event', () => {
      expect(() => esFullscreen.on('click', () => {})).toThrow('ESFullScreen only handle "fullscreenchange", "fullscreenerror" and "esfullscreenmethodchange" event, but not click. Pleas pass in an right event name.');
    });
    test('need a function', () => {
      expect(() => esFullscreen.on('fullscreenchange', 1)).toThrow('You must pass in an legal function, but not number.');
    });
    test('element must be legal', () => {
      expect(() => esFullscreen.on('fullscreenchange', () => {}, 1)).toThrow('You should passed in a legal element, but not number.');
    });
  });
  describe('open', () => {
    test('need a legal element', () => {
      expect(() => esFullscreen.open(1)).toThrow('You should passed in a legal element to requestFullScreen, but not number.');
    });
    test('need an element in document', () => {
      expect(() => esFullscreen.open(document.createElement('div'))).toThrow('You must pass in a HTML element in document.');
    });
  });
});
