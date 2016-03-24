import { Logger } from './logger';

export default class Utils {
    constructor () {
        Logger.abstractClassError();
    }

    static clone (obj) {
        if (obj == null || typeof obj !== 'object')
            return obj;

        const temp = {};

        for (const key in obj)
            if (obj.hasOwnProperty(key))
                temp[key] = obj[key];
        return temp;
    }

    static isHTMLNode (obj) {
        return obj instanceof HTMLElement;
    }

    static isUndefined (val) {
        return typeof val === 'undefined';
    }

    static isPlainObj (obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    }

    static isArray (arr) {
        return Array.isArray ? Array.isArray(arr) : Object.prototype.toString.call(arr) === '[object Array]';
    }

    static debounce (func, wait, immediate) {
        let timeout;

        /*
         Arrow functions do not expose an arguments object to their code: arguments.length, arguments[0], arguments[1],
         and so forth do not refer to the arguments provided to the arrow function when called.
         Instead, arguments is simply a reference to the name in the enclosing scope.
         */
        return function () {
            const args = arguments;

            const later = () => {
                timeout = null;
                if (!immediate)
                    func(...args);
            };
            const callNow = immediate && !timeout;

            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow)
                func(...args);
        };
    }
}

