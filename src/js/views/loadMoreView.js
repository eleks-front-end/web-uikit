import eventDriver from '../common/eventDriver';
import BaseView from './baseView';
import DOM from '../common/domHelper';


export default class LoadMoreView extends BaseView {
    
    setupView () {
        console.log(this)
        this.options = this.component.loadMore;
        
        this.el = DOM.createNode('span', {
            class: 'e-search-results-load_more'
        });

        this.el.innerHTML = this.options.text;

    }
    
    setupEvents () {
        this.el.addEventListener('click', this.clickHandler);
    }
    
    clickHandler () {
        eventDriver.trigger('LoadMore');
    }
}
