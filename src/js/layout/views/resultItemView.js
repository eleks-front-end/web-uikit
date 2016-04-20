import BaseView from './baseView';
import DOM from '../../common/domHelper';

/**
 * Class representing result item view
 * @class
 */
export default class extends BaseView {
    /**
     * create an HTMLElement and setup some styles depends in options
     */
    setupView () {
        this.el = DOM.createNode('div', {
            class: 'e-search-results-item'
        });
    }

    /**
     * Insert templated string in result item view
     * @param {string} data - templated string
     */
    render (data) {
        this.el.innerHTML = data;
    }
}
