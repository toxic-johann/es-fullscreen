export declare const supportDocument: boolean;
export declare function setStyle(el: HTMLElement, key: string | object, val?: string): void;
export declare function native(target: HTMLElement | string | object | null, name?: string | {
    keyOnly?: boolean;
}, option?: {
    keyOnly?: boolean;
}): any;
export declare function dispatchEvent(element: Element | Document, name: string, { bubbles, cancelable, }?: {
    bubbles?: boolean;
    cancelable?: boolean;
}): void;
