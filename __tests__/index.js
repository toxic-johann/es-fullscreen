import fullscreen from '../src/index.js';
describe(`base test when fullscreen.isNativelySupport is ${fullscreen.isNativelySupport}.`, () => {
  let node1, node2;
  beforeEach(() => {
    node1 = document.createElement('div');
    node2 = document.createElement('div');
    document.body.appendChild(node1);
    document.body.appendChild(node2);
  });
  test('default fullscreen element', () => {
    expect(fullscreen.fullscreenElement).toBe(null);
  });

  test('default isFullscreen', () => {
    expect(fullscreen.isFullscreen).toBe(false);
  });

  test('open and exit', () => {
    fullscreen.open(document.body);
    expect(fullscreen.isFullscreen).toBe(true);
    expect(fullscreen.fullscreenElement).toBe(document.body);
    fullscreen.exit();
    expect(fullscreen.fullscreenElement).toBe(null);
    expect(fullscreen.isFullscreen).toBe(false);
  });

  test('open the same one', () => {
    fullscreen.open(document.body);
    expect(fullscreen.isFullscreen).toBe(true);
    expect(fullscreen.fullscreenElement).toBe(document.body);
    fullscreen.open(document.body);
    expect(fullscreen.isFullscreen).toBe(true);
    expect(fullscreen.fullscreenElement).toBe(document.body);
    fullscreen.exit();
  });

  test('open different one', () => {
    fullscreen.open(node1);
    expect(fullscreen.isFullscreen).toBe(true);
    expect(fullscreen.fullscreenElement).toBe(node1);
    fullscreen.open(node2);
    expect(fullscreen.isFullscreen).toBe(true);
    expect(fullscreen.fullscreenElement).toBe(node1);
    fullscreen.exit();
  });

  test('open different one with force', () => {
    fullscreen.open(node1);
    expect(fullscreen.isFullscreen).toBe(true);
    expect(fullscreen.fullscreenElement).toBe(node1);
    fullscreen.open(node2, {force: true});
    expect(fullscreen.isFullscreen).toBe(true);
    expect(fullscreen.fullscreenElement).toBe(node2);
    fullscreen.exit();
  });

  test('useless exit', () => {
    fullscreen.exit();
  });

  test('fullscreenchange event', () => {
    const fn = jest.fn();
    fullscreen.on('fullscreenchange', fn);
    fullscreen.open(node1);
    expect(fn).toHaveBeenCalledTimes(1);
    fullscreen.exit();
    expect(fn).toHaveBeenCalledTimes(2);
    fullscreen.off('fullscreenchange', fn);
    fullscreen.open(node1);
    expect(fn).toHaveBeenCalledTimes(2);
    fullscreen.exit();
    expect(fn).toHaveBeenCalledTimes(2);
  });

  test('fullscreenerror event', () => {
    const fn = jest.fn();
    fullscreen.on('fullscreenerror', fn);
    fullscreen.open(node1);
    fullscreen.open(node2);
    expect(fn).toHaveBeenCalledTimes(1);
    fullscreen.off('fullscreenerror', fn);
    fullscreen.open(node2);
    expect(fn).toHaveBeenCalledTimes(1);
    fullscreen.exit();
  });

  afterEach(() => {
    document.body.removeChild(node1);
    document.body.removeChild(node2);
  });
});
