import Utils from '../common/utils';
import BaseView from './baseView';

export class SearchView extends BaseView {
    setupView () {
        this.el = this._element;
    }

    setupEvents () {
        let time = 500;

        if (this.component.options.searchType === 'server')
            time = 500;

        const deb = Utils.debounce({
            delayed: () => {
                this.keyDownHandler(!this.el.value);
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

    keyDownHandler (clear) {
        if (clear)
            this.component.clearResults();

        this.component.search(this._element.value);
    }
}

