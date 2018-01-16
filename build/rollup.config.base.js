const { version, name, author, license, dependencies } = require('../package.json');
export const banner = `
/**
 * ${name} v${version}
 * (c) 2017-${(new Date().getFullYear())} ${author}
 * Released under ${license}
 */
`;
import flow from 'rollup-plugin-flow-no-whitespace';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import common from 'rollup-plugin-commonjs';
const babelConfig = {
  common: {
    presets: [
      'flow',
      [ 'env', { modules: false }],
      'stage-0',
    ],
    plugins: [ 'transform-runtime', 'transform-decorators-legacy' ],
    runtimeHelpers: true,
    exclude: 'node_modules/**',
    babelrc: false,
  },
  es: {
    presets: [
      'flow',
      [ 'env', { modules: false }],
      'stage-0',
    ],
    plugins: [ 'transform-runtime', 'transform-decorators-legacy' ],
    runtimeHelpers: true,
    exclude: 'node_modules/**',
    babelrc: false,
  },
  umd: {
    presets: [ 'flow', 'es2015-rollup', 'stage-0' ],
    plugins: [ 'transform-decorators-legacy' ],
    exclude: 'node_modules/**',
    runtimeHelpers: true,
    babelrc: false,
  },
  iife: {
    presets: [ 'flow', 'es2015-rollup', 'stage-0' ],
    plugins: [ 'transform-decorators-legacy' ],
    exclude: 'node_modules/**',
    babelrc: false,
  },
  min: {
    presets: [ 'flow', 'es2015-rollup', 'stage-0' ],
    plugins: [ 'transform-decorators-legacy' ],
    exclude: 'node_modules/**',
    babelrc: false,
  },
};
const externalRegExp = new RegExp(Object.keys(dependencies).join('|'));
export default function(mode) {
  return {
    input: 'src/index.js',
    external(id) {
      return !/min|umd|iife/.test(mode) && externalRegExp.test(id);
    },
    plugins: [
      babel(babelConfig[mode]),
      flow(),
      resolve({
        customResolveOptions: {
          moduleDirectory: [ 'src', 'node_modules' ],
        },
      }),
      common(),
    ],
  };
}
