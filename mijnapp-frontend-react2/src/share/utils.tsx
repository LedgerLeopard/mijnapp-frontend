export const delay = (() => {
    let timer = 0;
    return function (callback: () => void | Promise<void>, ms: number) {
        clearTimeout(timer);
        timer = window.setTimeout(callback, ms);
    };
})();
