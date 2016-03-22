import { Logger } from './logger';

export default class {
    constructor () {
        Logger.abstractClassError();
    }

    static setElementOptions (el, options) {
        if (!el || !options)
            return Logger.log('Incorrect Arguments', 2);


        for (const key in options) {
            if (!options.hasOwnProperty(key)) continue;

            el.setAttribute(key, options[key]);
        }
    }

    static createNode (type, options) {
        let el = document.createElement(type);

        this.setElementOptions(options);

        return el;
    }

    static hasClass () {
        Logger.log('Not implemented');

        return false;
    }

    static addClass (node, className) {
        if (!this.hasClass(node, className))
            node.addClass(className);
    }

    static removeClass (node, className) {
        if (this.hasClass(node, className))
            node.removeClass(className);
    }

    static createFragment () {
        return document.createDocumentFragment();
    }
}