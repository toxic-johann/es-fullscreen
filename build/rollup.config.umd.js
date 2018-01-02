import base, { banner } from './rollup.config.base';
import replace from 'rollup-plugin-replace';
const config = base('umd');
config.plugins.unshift(replace({
  'process.env.NODE_ENV': '"production"',
}));
export default Object.assign(config, {
  output: {
    format: 'umd',
    file: 'lib/index.browser.js',
    name: 'esFullscreen',
    banner,
  },
});
