import BaseView from './baseView';
import DOM from '../../common/domHelper';

/**
 * Class representing click more button
 * @class
 */
export default class extends BaseView {

    constructor () {
        const defaults = {
            loadMore: {
                text: 'Load More!'
            }
        };

        super(defaults, ...arguments);
    }

    /**
     * create an HTMLElement and setup some styles depends in options
     */
    setupView () {
        this.el = DOM.createNode('span', {
            class: 'e-search-results-load_more btn btn-primary'
        });

        this.el.innerHTML = this.options.loadMore.text;
    }

    /**
     * Add event listeners for searchView element
     */
    setupEvents () {
        this.el.addEventListener('click', this.clickHandler.bind(this));
    }

    /**
     * @callback
     * Click event callback
     */
    clickHandler () {
        this.eventsDriver.trigger('LOAD_MORE');
    }
}
