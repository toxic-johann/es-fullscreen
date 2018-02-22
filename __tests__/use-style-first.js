import esFullscreen from '../src/index';
describe('use-style-fist', () => {
  test('esfullscreenmethodchange', () => {
    const fn = jest.fn();
    esFullscreen.on('esfullscreenmethodchange', fn);
    expect(fn).toHaveBeenCalledTimes(0);
    esFullscreen.useStyleFirst = true;
    expect(fn).toHaveBeenCalledTimes(1);
    esFullscreen.useStyleFirst = true;
    expect(fn).toHaveBeenCalledTimes(1);
    esFullscreen.useStyleFirst = false;
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
