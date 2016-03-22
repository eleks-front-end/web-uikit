import Logger from './logger';

export default class DOMHelper {
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

    /**
     *
     * @param {String} selector
     * @returns {NodeList}
     */
    static get(selector) {
        //TODO - specify switch selection by selector's type
        return document.querySelectorAll(selector)
    }

    static createNode (type, options) {
        let el = document.createElement(type);

        this.setElementOptions(el, options);

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
