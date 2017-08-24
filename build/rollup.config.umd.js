import base from './rollup.config.base';
export default Object.assign(base('umd'), {
  output: {
    format: 'umd',
    file: 'lib/index.browser.js'
  },
  name: 'esFullscreen'
});
