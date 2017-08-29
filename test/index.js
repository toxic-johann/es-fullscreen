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

  it('open and exit', () => {
    fullscreen.open(document.body);
    expect(fullscreen.isFullScreen).to.equal(true);
    expect(fullscreen.fullscreenElement).to.equal(document.body);
    fullscreen.exit();
    expect(fullscreen.fullscreenElement).to.equal(null);
    expect(fullscreen.isFullScreen).to.equal(false);
  });

  it('open the same one', () => {
    fullscreen.open(document.body);
    expect(fullscreen.isFullScreen).to.equal(true);
    expect(fullscreen.fullscreenElement).to.equal(document.body);
    fullscreen.open(document.body);
    expect(fullscreen.isFullScreen).to.equal(true);
    expect(fullscreen.fullscreenElement).to.equal(document.body);
  });
});
