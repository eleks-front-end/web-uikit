export default class Utils {
    constructor () {
        throw new Error('Abstract Class! The instance shouldn\'t be created');
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

    static isUndefined (val) {
        return typeof val === 'undefined';
    }

    static isPlainObj (obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    }

    static isArray (arr) {
        return Array.isArray ? Array.isArray(arr) : Object.prototype.toString.call(arr) === '[object Array]';
    }
}
