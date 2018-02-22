# es-fullscreen

[![Build Status](https://img.shields.io/travis/toxic-johann/es-fullscreen/master.svg?style=flat-square)](https://travis-ci.org/toxic-johann/es-fullscreen.svg?branch=master)
[![Coverage Status](https://img.shields.io/coveralls/toxic-johann/es-fullscreen/master.svg?style=flat-square)](https://coveralls.io/github/toxic-johann/es-fullscreen?branch=master)
[![npm](https://img.shields.io/npm/v/es-fullscreen.svg?colorB=brightgreen&style=flat-square)](https://www.npmjs.com/package/es-fullscreen)
[![npm download times](https://img.shields.io/npm/dm/es-fullscreen.svg)](https://www.npmjs.com/package/es-fullscreen)
[![dependency Status](https://david-dm.org/toxic-johann/es-fullscreen.svg)](https://david-dm.org/toxic-johann/es-fullscreen)
[![devDependency Status](https://david-dm.org/toxic-johann/es-fullscreen/dev-status.svg)](https://david-dm.org/toxic-johann/es-fullscreen?type=dev)

## Get start

**npm**

You can install through npm.

```sh
$ npm install es-fullscreen --save-dev
```

And then you can use it like this.

```javascript
import esFullscreen from 'es-fullscreen';
esFullscreen.open(document.body);
....
esFullscreen.exit();
```

## Documents

### open(element, [option])

* Arguments
  * {Element} element
  * {force?: boolean} option
* alias
  * requestFullscreen
* Details:

To fullscreen the element. Just like calling `element.requestFullscreen()`.

When we already have an fullscreen target, we can't fullscreen another one. So we will dispatch `fullscreenerror` at that time. However, if you really want to fullscreen, you can set `option.force` to be true. We will force the browser to fullscreen your element by existing fullscreen mode.

### exit()

* alias
  * exitFullscreen
* Details

Exit the fullscreen mode. Just like calling `document.exitFullscreen()`.

### fullscreenElment

* type
  * null | Element
* Details

Represent the element which is fullscreened.

### isFullscreem

* type
  * boolean
* Details

Represent is fullscreen or not.

### on(name, fn, [element])

* alias
  * addEventListener
* Arguments
  * {string} name: event's name, only can be 'fullscreenchange',  'fullscreenerror' or 'esfullscreenmethodchange' (supported after [0.3.0](https://github.com/toxic-johann/es-fullscreen/releases/tag/0.3.0))
  * {Function} fn
  * {Element} element: default to be `document`
* Details

To let user listen on 'fullscreenchange' and 'fullscreenerror' more easily. You use it just like normal `on` event. If you want to listen on specific element, please pass in the element at the third place.

* example

```javascript
import esFullscreen from 'es-fullscreen';
esFullscreen.on('fullscreenchange', evt => console.log('change!'));
esFullscreen.open(document.body); // change!
```

### off(name, fn, [element])

* alias
  * removeEventlistener
* Details

Totally the same as `on`.

### useStyleFirst

> supported after [0.3.0](https://github.com/toxic-johann/es-fullscreen/releases/tag/0.4.0)

* type
  * boolean
* default
  * `false`
* Details

When it's true, we will use style to fullscreen but not native way. You can change it and it will emit 'esfullscreenmethodchange' event.

## Changelog

Please read the [realase notes](https://github.com/toxic-johann/es-fullscreen/releases).

## Explanation of Different Build

You will find four differnet build in the lib.

| Name             | Kind     | Meaning                                  | Need to define environment |
| ---------------- | -------- | ---------------------------------------- | -------------------------- |
| index.js         | commonjs | Common js, mostly used in Webpack 1.     | Yes                        |
| index.mjs        | esmodule | in es module, mostly used in webpack 2 and rollup | Yes                        |
| index.browser.js | umd      | Can be used in browser directly          | No(It's in development)    |
| index.min.js     | umd      | Can be used in browser directly          | No(It's in production)     |

## Development vs. Production

Development/production modes are hard-coded for the UMD builds: the un-minified files are for development, and the minified files are for production.

CommonJS and ES Module builds are intended for bundlers, therefore we don’t provide minified versions for them. You will be responsible for minifying the final bundle yourself.

CommonJS and ES Module builds also preserve raw checks for `process.env.NODE_ENV` to determine the mode they should run in. You should use appropriate bundler configurations to replace these environment variables in order to control which mode Vue will run in. Replacing `process.env.NODE_ENV` with string literals also allows minifiers like UglifyJS to completely drop the development-only code blocks, reducing final file size.

### Webpack

Use Webpack’s [DefinePlugin](https://webpack.js.org/plugins/define-plugin/):

```
var webpack = require('webpack')

module.exports = {
  // ...
  plugins: [
    // ...
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
}
```

### Rollup

Use [rollup-plugin-replace](https://github.com/rollup/rollup-plugin-replace):

```
const replace = require('rollup-plugin-replace')

rollup({s
  // ...
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
}).then(...)
```

## License

[MIT](https://opensource.org/licenses/MIT)