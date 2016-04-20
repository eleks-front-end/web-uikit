import BaseView from './baseView';
import DOM from '../../common/domHelper';

/**
 * Class representing click more button
 * @class
 */
export default class extends BaseView {
    /**
     * create an HTMLElement and setup some styles depends in options
     */
    setupView () {
        this.el = DOM.createNode('span', {
            class: 'e-search-results-load_more'
        });
    }

    /**
     * Add event listeners for searchView element
     */
    setupEvents () {
        this.el.addEventListener('click', this.clickHandler);
    }

    /**
     * @callback
     * Click event callback
     */
    clickHandler () {
        // eventDriver.trigger('LoadMore');
    }
}
