import Utils from '../common/utils';
import Logger from '../common/logger';

export default class BaseView {
    constructor (element = null, component) {
        this._element = element;
        this.component = component;
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

    hide () {
        this.el.style.display = 'none';
    }

    show () {
        this.el.style.display = '';
    }
}
