import fullscreen from '../src/index.js';
describe('base test', () => {
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

  test('default isFullScreen', () => {
    expect(fullscreen.isFullScreen).toBe(false);
  });

  test('open and exit', () => {
    fullscreen.open(document.body);
    expect(fullscreen.isFullScreen).toBe(true);
    expect(fullscreen.fullscreenElement).toBe(document.body);
    fullscreen.exit();
    expect(fullscreen.fullscreenElement).toBe(null);
    expect(fullscreen.isFullScreen).toBe(false);
  });

  test('open the same one', () => {
    fullscreen.open(document.body);
    expect(fullscreen.isFullScreen).toBe(true);
    expect(fullscreen.fullscreenElement).toBe(document.body);
    fullscreen.open(document.body);
    expect(fullscreen.isFullScreen).toBe(true);
    expect(fullscreen.fullscreenElement).toBe(document.body);
    fullscreen.exit();
  });

  test('open different one', () => {
    fullscreen.open(node1);
    expect(fullscreen.isFullScreen).toBe(true);
    expect(fullscreen.fullscreenElement).toBe(node1);
    fullscreen.open(node2);
    expect(fullscreen.isFullScreen).toBe(true);
    expect(fullscreen.fullscreenElement).toBe(node1);
    fullscreen.exit();
  });

  test('open different one with force', () => {
    fullscreen.open(node1);
    expect(fullscreen.isFullScreen).toBe(true);
    expect(fullscreen.fullscreenElement).toBe(node1);
    fullscreen.open(node2, {force: true});
    expect(fullscreen.isFullScreen).toBe(true);
    expect(fullscreen.fullscreenElement).toBe(node2);
    fullscreen.exit();
  });

  test('useless exit', () => {
    fullscreen.exit();
  });

  afterEach(() => {
    document.body.removeChild(node1);
    document.body.removeChild(node2);
  });
});
