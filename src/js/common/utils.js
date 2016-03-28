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

    static isArray (obj) {
        return Array.isArray ? Array.isArray(obj) : Object.prototype.toString.call(obj) === '[object Array]';
    }

    static isFunction (obj) {
        return Object.prototype.toString.call(obj) === '[object Function]';
    }

    static debounce (opts) {
        let timeout;
        let that = this;
        /*
         Arrow functions do not expose an arguments object to their code: arguments.length, arguments[0], arguments[1],
         and so forth do not refer to the arguments provided to the arrow function when called.
         Instead, arguments is simply a reference to the name in the enclosing scope.
         */
        return function () {
            if (that.isFunction(opts.instantly))
                opts.instantly();

            const args = arguments;

            const later = () => {
                timeout = null;
                if (!opts.immediate)
                    opts.delayed(...args);
            };
            const callNow = opts.immediate && !timeout;

            clearTimeout(timeout);
            timeout = setTimeout(later, opts.time);
            if (callNow)
                opts.delayed(...args);
        };
    }

    static insertAfter (elem, refElem) {
        refElem.parentNode.insertBefore(elem, refElem.nextSibling);
    }

    static addPxToCss(param) {
        return `${parseInt(param)}px`;
    }
}

