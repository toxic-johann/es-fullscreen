declare class ESFullscreen {
    _savedStyles: object;
    _bodyOverflow: string;
    _htmlOverflow: string;
    _fullscreenElement: HTMLElement | null;
    isNativelySupport: boolean;
    _openKey: string;
    _exitKey: string;
    _useStyleFirst: boolean;
    hasUsedStyle: boolean;
    useStyleFirst: boolean;
    readonly fullscreenElement: Element | null;
    readonly isFullscreen: boolean;
    requestFullscreen(element: HTMLElement, option?: {
        force?: boolean;
    }): boolean;
    open(element: HTMLElement, { force }?: {
        force?: boolean;
    }): boolean;
    exitFullscreen(): boolean;
    exit(): boolean;
    addEventListener(name: string, fn: (...args: any[]) => any, element?: HTMLElement | Document): void;
    on(name: string, fn: (...args: any[]) => any, element?: HTMLElement | Document): void;
    removeEventListene(name: string, fn: (...args: any[]) => any, element?: HTMLElement | Document): void;
    off(name: string, fn: (...args: any[]) => any, element?: HTMLElement | Document): void;
    _handleEvent(element: HTMLElement | Document, behavior: string, name: string, fn: (...args: any[]) => any): void;
}
export declare const esFullscreen: ESFullscreen;
export default esFullscreen;
