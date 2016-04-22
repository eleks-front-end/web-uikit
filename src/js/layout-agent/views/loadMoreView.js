import BaseView from './baseView';
import DOM from '../../common/domHelper';

/**
 * Class representing click more button
 * @class
 */
export default class extends BaseView {
    /**
     * create load more which extends on {BaseView}
     * @param {{}} eventsDriver - events driver for communication between layout sub-components
     * @param {{}} options - layout agents options
     */
    constructor (eventsDriver, options) {
        const defaults = {
            loadMore: {
                text: 'Load More!'
            }
        };

        super(eventsDriver, options, defaults);
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
        console.log(this)
        this.eventsDriver.trigger('LOAD_MORE');
    }
}
