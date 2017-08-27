import chai from 'chai';
const {expect} = chai;
import fullscreen from '../src/index.js';

describe('base test', () => {
  it('default fullscreen element', () => {
    expect(fullscreen.fullscreenElement).to.equal(null);
  });

  it('default isFullScreen', () => {
    expect(fullscreen.isFullScreen).to.equal(false);
  });
});
