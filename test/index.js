import chai from 'chai';
const {expect} = chai;
import fullscreen from '../src/index.js';
describe('base test', () => {
  let node1, node2;
  beforeEach(() => {
    node1 = document.createElement('div');
    node2 = document.createElement('div');
    document.body.appendChild(node1);
    document.body.appendChild(node2);
  });
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
    fullscreen.exit();
  });

  it('open different one', () => {
    fullscreen.open(node1);
    expect(fullscreen.isFullScreen).to.equal(true);
    expect(fullscreen.fullscreenElement).to.equal(node1);
    fullscreen.open(node2);
    expect(fullscreen.isFullScreen).to.equal(true);
    expect(fullscreen.fullscreenElement).to.equal(node1);
    fullscreen.exit();
  });

  it('open different one with force', () => {
    fullscreen.open(node1);
    expect(fullscreen.isFullScreen).to.equal(true);
    expect(fullscreen.fullscreenElement).to.equal(node1);
    fullscreen.open(node2, {force: true});
    expect(fullscreen.isFullScreen).to.equal(true);
    expect(fullscreen.fullscreenElement).to.equal(node2);
    fullscreen.exit();
  });

  it('useless exit', () => {
    fullscreen.exit();
  });

  afterEach(() => {
    document.body.removeChild(node1);
    document.body.removeChild(node2);
  });
});
