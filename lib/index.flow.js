declare module 'es-fullscreen' {
  declare module.exports: {
    _fullscreenElement: HTMLElement | null;
    _openKey: string;
    _exitKey: string;
    _savedStyles: Object;
    _bodyOverflow: string;
    _htmlOverflow: string;
    isFullScreen: boolean;
    isNativelySupport: boolean;
    fullscreenElement: Element | null;
    isFullScreen: boolean;
    open (element: Element, option?: {force: boolean}): boolean;
    exit (): boolean;
    _dispatchEvent (element: Element): void;
  }
}