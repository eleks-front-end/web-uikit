import { Logger } from '../common/logger';

export default class {
    constructor () {
        this._element = null;
        this.setupView();
        this.setupEvents();
    }

    setupView () {
        Logger.abstractMethod();
    }

    setupEvents () {}

    set el (node) {
        if (!(node instanceof HTMLElement))
            Logger.log('Value not assignable to el', 1);

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
