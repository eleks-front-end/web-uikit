import {Logger} from './logger';

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

    static isSetObj (obj) {
        return Object.prototype.toString.call(obj) === '[object Set]';
    }

    static lookThroughNestedObj (obj, cb) {
        // obj = this.isArray(obj) ? obj : Object.keys
        for (const item in obj) {
            if (!obj.hasOwnProperty(item))
                continue;

            const dontNeedContinue = cb(item, obj);

            if (dontNeedContinue)
                continue;

            if (this.isArray(obj[item]))
                this.lookThroughNestedArray(obj[item], cb);
            else if (Utils.isPlainObj(obj[item])) {
                this.lookThroughNestedObj(obj[item], cb);
            }
        }
    }

    static lookThroughNestedArray (array, cb) {
        for (const item of array) {
            if (this.isArray(item))
                this.lookThroughNestedArray(item, cb);
            else if (this.isPlainObj(item))
                this.lookThroughNestedObj(item, cb);

            cb(item, array);
        }

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

    static addPxToCss (param) {
        return `${parseInt(param)}px`;
    }

    static GUID () {
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);

        return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`.toLowerCase();
    }

    static mergeSets (set1, set2) {
        return new Set([...set1, ...set2]);
    }
}

