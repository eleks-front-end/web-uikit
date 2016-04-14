import BaseView from './baseView';
import DOM from '../../common/domHelper';

export default class extends BaseView {

    setupView () {
        this.el = DOM.createNode('div', {
            class: 'e-search-results-item'
        });
    }

    render (data) {
        this.el.innerHTML = data;
    }
}
