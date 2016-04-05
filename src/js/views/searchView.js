import Logger from '../common/logger';
import Utils from '../common/utils';
import BaseView from './baseView';
import DOM from '../common/domHelper';

export class SearchView extends BaseView {
    setupView () {
        this.el = this._element;
    }

    setupEvents () {
        let time = 0;

        if (this.component.options.searchType === 'server')
            time = 500;

        const deb = Utils.debounce({
            delayed: () => {
                this.keyDownHandler();
            },
            time,
            instantly: () => {
                this.component.clearResults();
            }
        });

        this.el.addEventListener('keypress', deb);
        this.el.addEventListener('paste', deb);
        this.el.addEventListener('cut', deb);
        this.el.addEventListener('keydown', e => {
            const key = e.keyCode;

            if (key !== 8 && key !== 46)
                return;

            deb();
        });
    }

    keyDownHandler () {
        if (this.component.options.searchType === 'server')
            this.component.serverSearch(this._element.value);
        else
            this.component.clientSearch(this._element.value);
    }
}

