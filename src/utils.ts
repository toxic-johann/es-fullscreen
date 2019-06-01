import { isPlainObject, isString } from 'lodash-es';
import { isElement, isEvent, isFunction } from 'toxic-predicate-functions';
import { SYNONYMS, VENDOR_PREFIXES } from './const';

export const supportDocument = typeof document !== 'undefined';

export function setStyle(el: HTMLElement, key: string | object, val?: string) {
  if (isString(key)) {
    // @ts-ignore
    el.style[key] = val;
  } else {
    // tslint:disable forin
    for (const k in (key as any)) {
      setStyle(el, k, (key as any)[k]);
    }
  }
}

export function native(
  target: HTMLElement | string | object | null,
  name?: string | { keyOnly?: boolean },
  option: { keyOnly?: boolean } = {}) {
  if (name && !isString(name)) {
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
  if (!isString(name)) { throw new Error(`You must pass in a string as name, but not ${typeof name}.`); }
  // tslint:disable-next-line prefer-for-of
  for (let i = 0; i < SYNONYMS.length; i++) {
    name = name.replace(SYNONYMS[i][0], SYNONYMS[i][1]);
    for (let j = 0; j < VENDOR_PREFIXES.length; j++) {
      const prefixed = j === 0
        ? name
        : (VENDOR_PREFIXES[j] + name.charAt(0).toUpperCase() + name.substr(1));
      if ((target as any)[prefixed] !== undefined) { return keyOnly ? prefixed : (target as any)[prefixed]; }
    }
  }
  return keyOnly ? '' : undefined;
}

export function dispatchEvent(element: Element | Document, name: string, {
  bubbles = true,
  cancelable = true,
}: {
  bubbles?: boolean,
  cancelable?: boolean,
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
  // @ts-ignore: IE < 9
  } else if (supportDocument && document.createEventObject) {
    // @ts-ignore: IE < 9
    event = document.createEventObject();
    event.eventType = name;
    event.eventName = name;
  }
  /* istanbul ignore next  */
  if (!isPlainObject(event) && !isEvent(event)) {
    throw new Error('We can\'t create an object on this browser, please report to author');
  }
  /* istanbul ignore else  */
  if (element.dispatchEvent) {
    element.dispatchEvent(event);
  // @ts-ignore: IE < 9
  } else if (element.fireEvent) {
    // @ts-ignore: IE < 9
    element.fireEvent('on' + event.eventType, event); // can trigger only real event (e.g. 'click')
  } else if ((element as any)[name]) {
    (element as any)[name]();
  } else if ((element as any)['on' + name]) {
    (element as any)['on' + name]();
  }
}
