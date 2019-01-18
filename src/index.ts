import { defined, isElement, isFunction, isPosterityNode } from 'toxic-predicate-functions';
import { DESKTOP_FULLSCREEN_STYLE, FULLSCREEN_CHANGE, FULLSCREEN_ERROR } from './const';
import { dispatchEvent, native, setStyle, supportDocument } from './utils';
const fullscreenEnabled = native('fullscreenEnabled');
let useStyleFirst = false;

class ESFullScreen {
  public _savedStyles: object;
  public _bodyOverflow: string;
  public _htmlOverflow: string;

  public _fullscreenElement: HTMLElement | null = null;
  public isNativelySupport: boolean = (defined(native('fullscreenElement')) &&
    (!defined(fullscreenEnabled) || fullscreenEnabled === true));
  public _openKey: string = supportDocument
    ? native(document.body || document.documentElement, 'requestFullscreen', { keyOnly: true })
    : '';
  public _exitKey: string = native('exitFullscreen', { keyOnly: true });
  public _useStyleFirst = false;
  public hasUsedStyle: boolean = false;

  get useStyleFirst(): boolean {
    return useStyleFirst;
  }

  set useStyleFirst(value: boolean) {
    value = !!value;
    if (value === useStyleFirst) { return; }
    useStyleFirst = value;
    dispatchEvent(document, 'esfullscreenmethodchange');
  }

  get fullscreenElement(): Element | null {
    const element = [
      'fullscreenElement',
      'webkitFullscreenElement',
      'mozFullScreenElement',
      'msFullscreenElement',
    ].reduce((element, key) => {
      return element || (document as any)[key];
    }, null);
    return element || this._fullscreenElement;
  }

  get isFullscreen(): boolean {
    return isElement(this.fullscreenElement);
  }

  public requestFullscreen(element: HTMLElement, option: { force?: boolean } = { force: false }): boolean {
    return this.open(element, option);
  }

  public open(element: HTMLElement, { force = false }: { force?: boolean } = {}): boolean {
    /* istanbul ignore else  */
    if (process.env.NODE_ENV !== 'production') {
      if (!isElement(element)) {
        throw new Error(`You should passed in a legal element to requestFullScreen, but not ${typeof element}.`);
      }
      if (!isPosterityNode(document, element)) { throw new Error('You must pass in a HTML element in document.'); }
    }
    const originElement = this.fullscreenElement;
    if (originElement && originElement !== element) {
      if (!force) {
        dispatchEvent(document, 'fullscreenerror');
        return false;
      }
      this.exit();
    }

    if (!this.useStyleFirst) {
      if (this.isNativelySupport) {
        if (isFunction((element as any)[this._openKey])) {
          (element as any)[this._openKey]();
        }
        return true;
      }

      // add wekitEnterFullscreen support as required in https://github.com/toxic-johann/es-fullscreen/issues/4
      /* istanbul ignore if  */
      if (element instanceof HTMLVideoElement &&
        element.webkitSupportsFullscreen &&
        // $FlowFixMe: support webkitEnterFullscreen on some werid safari
        isFunction(element.webkitEnterFullscreen)) {
        element.webkitEnterFullscreen();
        this._fullscreenElement = element;
        return true;
      }
    }

    this._savedStyles = Object.keys(DESKTOP_FULLSCREEN_STYLE)
      .reduce((styles, key) => {
        (styles as any)[key] = (element.style as any)[key];
        return styles;
      }, {});
    setStyle(element, DESKTOP_FULLSCREEN_STYLE);

    /* istanbul ignore else  */
    if (document.body) {
      this._bodyOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
    /* istanbul ignore else  */
    if (document.documentElement) {
      this._htmlOverflow = document.documentElement.style.overflow;
      document.documentElement.style.overflow = 'hidden';
    }
    this._fullscreenElement = element;
    this.hasUsedStyle = true;
    dispatchEvent(element, 'fullscreenchange');
    return true;
  }

  public exitFullscreen() {
    return this.exit();
  }

  public exit() {
    if (!this.isFullscreen) { return false; }
    if (this.isNativelySupport &&
      !this.useStyleFirst &&
      !this.hasUsedStyle) {
      (document as any)[this._exitKey]();
      return true;
    }
    // $FlowFixMe: element is an Elment here
    const element: HTMLElement = this._fullscreenElement;
    setStyle(element, this._savedStyles);
    /* istanbul ignore else  */
    if (document.body) { document.body.style.overflow = this._bodyOverflow; }
    /* istanbul ignore else  */
    if (document.documentElement) { document.documentElement.style.overflow = this._htmlOverflow; }

    this._fullscreenElement = null;
    this._savedStyles = {};
    dispatchEvent(element, 'fullscreenchange');
    return true;
  }

  public addEventListener(name: string, fn: (...args: any[]) => any, element: HTMLElement | Document = document) {
    return this.on(name, fn, element);
  }

  public on(name: string, fn: (...args: any[]) => any, element: HTMLElement | Document = document) {
    this._handleEvent(element, 'addEventListener', name, fn);
  }

  public removeEventListene(name: string, fn: (...args: any[]) => any, element: HTMLElement | Document = document) {
    return this.off(name, fn, element);
  }

  public off(name: string, fn: (...args: any[]) => any, element: HTMLElement | Document = document) {
    this._handleEvent(element, 'removeEventListener', name, fn);
  }

  public _handleEvent(element: HTMLElement | Document, behavior: string, name: string, fn: (...args: any[]) => any) {
    /* istanbul ignore else  */
    if (process.env.NODE_ENV !== 'production') {
      if (name !== 'fullscreenchange' &&
        name !== 'fullscreenerror' &&
        name !== 'esfullscreenmethodchange'
      ) {
        // tslint:disable-next-line max-line-length
        throw new Error(`${this.constructor.name} only handle "fullscreenchange", "fullscreenerror" and "esfullscreenmethodchange" event, but not ${name}. Pleas pass in an right event name.`);
      }
      if (!isFunction(fn)) { throw new Error(`You must pass in an legal function, but not ${typeof fn}.`); }
      if (!isElement(element) && element !== document) {
         throw new Error(`You should passed in a legal element, but not ${typeof element}.`);
      }
    }
    const names = name === 'fullscreenchange'
      ? FULLSCREEN_CHANGE
      : name === 'fullscreenerror'
        ? FULLSCREEN_ERROR
        : [ name ];
    names.forEach((name) => {
      (element as any)[behavior](name, fn);
    });
  }
}
export const esFullScreen = new ESFullScreen();
export default esFullScreen;
