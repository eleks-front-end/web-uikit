import BaseView from './baseView';
import DOM from '../common/domHelper';

export default class ResultItemView extends BaseView {

    setupView () {
        this.el = DOM.createNode('li', {
            class: 'e-search-results-item'
        });
    }

    render (data) {
        this.el.innerHTML = data;
    }
}
