import Utils from '../../common/utils';
import Logger from '../../common/logger';

/**
 * Class representing Abstract Class of all views
 * @class
 * @abstract
 */
export default class BaseView {
    /**
     *
     * @param options
     */
    constructor (defaults = {}, options, eventsDriver) {
        this.options = Utils.objDeepMerge(defaults, options);
        this.setupView();
        this.setupEvents();
    }

    /**
     * should be implemented in subclasses
     * @abstract
     */
    setupView () {
        Logger.abstractMethod();
    }

    /**
     * may or may not be implemented in subclasses
     */
    setupEvents () {
    }

    /**
     * Set el of view class
     * @param {HTMLElement} node
     */
    set el (node) {
        if (!Utils.isHTMLNode(node))
            return Logger.log('Value not assignable to el', 1);

        this._element = node;
    }

    /**
     * Get el of view class
     * @returns {HTMLElement}
     */
    get el () {
        return this._element;
    }

    /**
     * Set style of element
     * @param {string} name - name of css property
     * @param {string|number} value - value of css property
     */
    setStyle (name, value) {
        this.el.style[name] = value;
    }

    /**
     * Get style of element
     * @param {string} name - name of css property
     * @returns {string} - value of css property
     */
    getStyle (name) {
        return this.el.style[name];
    }

    /**
     * Hide element
     */
    hide () {
        this.setStyle('display', 'none');
    }

    /**
     * Show element
     */
    show () {
        this.setStyle('display', '');
    }

    /**
     * Get all offset(relative to element) parents
     * @returns {HTMLElement[]} - list of offset parents
     */
    getOffsetParents () {
        const parents = [];
        let el = this.el;

        while (el.offsetParent && el.offsetParent.nodeName !== 'BODY') {
            parents.push(el.offsetParent);
            el = el.offsetParent;
        }

        return parents;
    }

    /**
     * Insert node before element of class
     * @param {HTMLElement} elem - element which should be inserted before element of class
     */
    insertBefore (elem) {
        this.el.parentNode.insertBefore(elem, this.el);
    }

    /**
     * Insert node after element of class
     * @param {HTMLElement} elem - element which should be inserted after element of class
     */
    insertAfter (elem) {
        this.el.parentNode.insertBefore(elem, this.el.nextSibling);
    }

    /**
     * Insert node into element of class
     * @param {HTMLElement} elem - element which should be inserted into element of class
     */
    appendChild (elem) {
        this.el.appendChild(elem);
    }
}
