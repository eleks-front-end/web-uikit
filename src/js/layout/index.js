import DOM from '../common/domHelper';
import ResultView from './views/resultView';
import ResultItemView from './views/resultItemView';
import LoadMoreView from './views/loadMoreView';

export default class {

    /**
     * Class repesented layout of
     * @param type
     * @param options
     */
    constructor (type, options) {
        this.type = type;

        const defaults = {
            position: 'absolute',
            appendTo: document.body,
            width: 'auto'
        };

        this.options = Object.assign({}, defaults, options);

        this.resultView = new ResultView(this.options);

        this.loadMore = new LoadMoreView(null, this.component).el;
        this.resultView.footer.appendChild(this.loadMore);
        // this.resultView.hide();
    }

    addEventsDriver (eventsDriver) {
        this.eventsDriver = eventsDriver;
    }

    /**
     * Append result items to result view element
     * @param {string[]} items - collection of result items
     */
    update (items) {
        const fragment = DOM.createFragment();

        for (const item of items) {
            const itemView = new ResultItemView();

            itemView.render(item);

            fragment.appendChild(itemView.el);
        }

        if (!items.length)
            this.resultView.hide();
        else
            this.resultView.show();

        this.resultView.content.appendChild(fragment);
    }

    setInputOffsets (offsets) {
        this.options.inputOffsets = offsets;
        this.resultView.place(offsets);
    }

    render (el) {
        this.el = el;

        switch (this.type) {
            case 'multiColumn':
                this.multiColumn();
                break;
        }

        return this.el;
    }

    clearResults () {
        this.resultView.clear();
        this.resultView.hide();
    }

    multiColumn () {
        const prefix = this.prefix;

        if (!this.options.columnCount)
            return false;

        this.addStyle(prefix('column-count'), this.options.columnCount);

        if (this.options.columnGap)
            this.addStyle(prefix('column-gap'), this.options.columnGap);

        if (this.options.columnRule)
            this.addStyle(prefix('column-rule'), this.options.columnRule);
    }

    addStyle (name, value) {
        this.el.style[name] = value;
    }

    prefix (name) {
        const styles = window.getComputedStyle(document.documentElement, '');

        return Array.prototype.slice
            .call(styles)
            .join(' ')
            .match(new RegExp(`(-\\w+-)?${name}`))[0];
    }
}