test('to make it run', () => expect(1).toBe(1));
export default function tester(esFullscreen) {
  describe(`base test when esFullscreen.isNativelySupport is ${esFullscreen.isNativelySupport}.`, () => {
    let node1,
      node2;
    beforeEach(() => {
      function wrap(element) {
        if (esFullscreen.isNativelySupport) {
          element.requestFullscreen = element.requestFullscreen || (() => {
            document.fullscreenElement = element;
            document.dispatchEvent(new Event('fullscreenchange'));
          });
        }
        return element;
      }
      node1 = wrap(document.createElement('div'));
      node2 = wrap(document.createElement('div'));
      document.body.appendChild(node1);
      document.body.appendChild(node2);
    });
    test('default fullscreen element', () => {
      expect(esFullscreen.fullscreenElement).toBe(null);
    });

    test('default isFullscreen', () => {
      expect(esFullscreen.isFullscreen).toBe(false);
    });

    test('open and exit', () => {
      esFullscreen.open(document.body);
      expect(esFullscreen.isFullscreen).toBe(true);
      expect(esFullscreen.fullscreenElement).toBe(document.body);
      esFullscreen.exit();
      expect(esFullscreen.fullscreenElement).toBe(null);
      expect(esFullscreen.isFullscreen).toBe(false);
    });

    test('open the same one', () => {
      esFullscreen.open(document.body);
      expect(esFullscreen.isFullscreen).toBe(true);
      expect(esFullscreen.fullscreenElement).toBe(document.body);
      esFullscreen.open(document.body);
      expect(esFullscreen.isFullscreen).toBe(true);
      expect(esFullscreen.fullscreenElement).toBe(document.body);
      esFullscreen.exit();
    });

    test('open different one', () => {
      esFullscreen.open(node1);
      expect(esFullscreen.isFullscreen).toBe(true);
      expect(esFullscreen.fullscreenElement).toBe(node1);
      esFullscreen.open(node2);
      expect(esFullscreen.isFullscreen).toBe(true);
      expect(esFullscreen.fullscreenElement).toBe(node1);
      esFullscreen.exit();
    });

    test('open different one with force', () => {
      esFullscreen.open(node1);
      expect(esFullscreen.isFullscreen).toBe(true);
      expect(esFullscreen.fullscreenElement).toBe(node1);
      esFullscreen.open(node2, { force: true });
      expect(esFullscreen.isFullscreen).toBe(true);
      expect(esFullscreen.fullscreenElement).toBe(node2);
      esFullscreen.exit();
    });

    test('useless exit', () => {
      esFullscreen.exit();
    });

    test('fullscreenchange event', () => {
      const fn = jest.fn();
      esFullscreen.on('fullscreenchange', fn);
      esFullscreen.open(node1);
      expect(fn).toHaveBeenCalledTimes(1);
      esFullscreen.exit();
      expect(fn).toHaveBeenCalledTimes(2);
      esFullscreen.off('fullscreenchange', fn);
      esFullscreen.open(node1);
      expect(fn).toHaveBeenCalledTimes(2);
      esFullscreen.exit();
      expect(fn).toHaveBeenCalledTimes(2);
    });

    test('fullscreenerror event', () => {
      const fn = jest.fn();
      esFullscreen.on('fullscreenerror', fn);
      esFullscreen.open(node1);
      esFullscreen.open(node2);
      expect(fn).toHaveBeenCalledTimes(1);
      esFullscreen.off('fullscreenerror', fn);
      esFullscreen.open(node2);
      expect(fn).toHaveBeenCalledTimes(1);
      esFullscreen.exit();
    });

    afterEach(() => {
      document.body.removeChild(node1);
      document.body.removeChild(node2);
    });
  });
}

