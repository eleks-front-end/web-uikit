import DOM from '../../common/domHelper';
import BaseView from './baseView';


export class ResultViewHeader extends BaseView {
    setupView () {
        this.el = DOM.createNode('div', {
            class: 'e-search-results-header'
        });
    }
}

export class ResultViewContent extends BaseView {
    setupView () {
        this.el = DOM.createNode('div', {
            class: 'e-search-results-content'
        });
    }
}

export class ResultViewFooter extends BaseView {
    setupView () {
        this.el = DOM.createNode('div', {
            class: 'e-search-results-footer'
        });
    }
}
