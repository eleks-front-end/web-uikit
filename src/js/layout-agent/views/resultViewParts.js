import DOM from '../../common/domHelper';
import BaseView from './baseView';

/**
 * Class representing part of result view - header
 * @class
 */
export class ResultViewHeader extends BaseView {
    /**
     * Create an HTMLElement
     */
    setupView () {
        this.el = DOM.createNode('div', {
            class: 'e-search-results-header'
        });
    }
}

/**
 * Class representing part of result view - content
 * @class
 */
export class ResultViewContent extends BaseView {
    /**
     * Create an HTMLElement
     */
    setupView () {
        this.el = DOM.createNode('div', {
            class: 'e-search-results-content'
        });
    }
}

/**
 * Class representing part of result view - content
 * @class
 */
export class ResultViewFooter extends BaseView {
    /**
     * Create an HTMLElement
     */
    setupView () {
        this.el = DOM.createNode('div', {
            class: 'e-search-results-footer'
        });
    }
}
