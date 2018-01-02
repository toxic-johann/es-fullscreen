// @flow
import { isObject } from 'toxic-predicate-functions';
import { VENDOR_PREFIXES, SYNONYMS } from './const';
import { isElement, isString, isFunction, isEvent } from 'toxic-predicate-functions';

export const supportDocument = typeof document !== 'undefined';

export function setStyle(el: Element, key: string | Object, val?: string) {
  if (isObject(key)) {
    for (const k in key) {
      setStyle(el, k, key[k]);
    }
  } else {
    // $FlowFixMe: we found it
    el.style[key] = val;
  }
}

export function native(target: HTMLElement | string | Object | null, name?: string | Object, option?: {keyOnly?: boolean} = {}) {
  if (isObject(name)) {
    option = name;
  }
  if (isString(target)) {
    name = target;
  }
  const { keyOnly = false } = option;
  /* istanbul ignore if */
  if (!supportDocument) {
    return keyOnly ? '' : undefined;
  }
  if (!isElement(target)) {
    target = document;
  }
  if (!isString(name)) throw new Error(`You must pass in a string as name, but not ${typeof name}.`);
  for (let i = 0; i < SYNONYMS.length; i++) {
    name = name.replace(SYNONYMS[i][0], SYNONYMS[i][1]);
    for (let j = 0; j < VENDOR_PREFIXES.length; j++) {
      const prefixed = j === 0
        ? name
        : (VENDOR_PREFIXES[j] + name.charAt(0).toUpperCase() + name.substr(1));
      // $FlowFixMe: we support document computed property here
      if (target[prefixed] !== undefined) return keyOnly ? prefixed : target[prefixed];
    }
  }
  return keyOnly ? '' : undefined;
}

export function dispatchEvent(element: Element | Document, name: string, {
  bubbles = true,
  cancelable = true,
}: {
  bubbles?: boolean,
  cancelable?: boolean
} = {}) {
  let event;
  /* istanbul ignore else  */
  if (isFunction(Event)) {
    event = new Event(name, {
      bubbles,
      cancelable,
    });
  } else if (supportDocument && document.createEvent) {
    event = document.createEvent('HTMLEvents');
    event.initEvent(name, true, true);
  } else if (supportDocument && document.createEventObject) {
    // $FlowFixMe: IE < 9
    event = document.createEventObject();
    event.eventType = name;
    event.eventName = name;
  }
  /* istanbul ignore next  */
  if (!isObject(event) && !isEvent(event)) throw new Error("We can't create an object on this browser, please report to author");
  /* istanbul ignore else  */
  if (element.dispatchEvent) {
    element.dispatchEvent(event);
  // $FlowFixMe: IE < 9
  } else if (element.fireEvent) {
    // $FlowFixMe: IE < 9
    element.fireEvent('on' + event.eventType, event);// can trigger only real event (e.g. 'click')
  // $FlowFixMe: support computed key
  } else if (element[name]) {
    // $FlowFixMe: support computed key
    element[name]();
  // $FlowFixMe: support computed key
  } else if (element['on' + name]) {
    // $FlowFixMe: support computed key
    element['on' + name]();
  }
}
