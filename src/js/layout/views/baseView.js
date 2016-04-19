import Utils from '../../common/utils';
import Logger from '../../common/logger';

export default class BaseView {
    constructor (options) {
        this.options = options;
        this.setupView();
        this.setupEvents();
    }

    setupView () {
        Logger.abstractMethod();
    }

    setupEvents () {
    }

    set el (node) {
        if (!Utils.isHTMLNode(node))
            return Logger.log('Value not assignable to el', 1);

        this._element = node;
    }

    get el () {
        return this._element;
    }

    setStyle (name, value) {
        this.el.style[name] = value;
    }

    getStyle (name) {
        return this.el.style[name];
    }

    hide () {
        this.setStyle('display', 'none');
    }

    show () {
        this.setStyle('display', '');
    }

    getOffsetParents () {
        const parents = [];
        let el = this.el;

        while (el.offsetParent && el.offsetParent.nodeName !== 'BODY') {
            parents.push(el.offsetParent);
            el = el.offsetParent;
        }

        return parents;
    }

    insertBefore (elem) {
        this.el.parentNode.insertBefore(elem, this.el);
    }

    insertAfter (elem) {
        this.el.parentNode.insertBefore(elem, this.el.nextSibling);
    }

    appendChild (elem) {
        this.el.appendChild(elem);
    }
}
