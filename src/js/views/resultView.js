import Utils from '../common/utils';
import BaseView from './baseView';
import DOM from '../common/domHelper';
import ResultItemView from './resultItemView';
import LoadMoreView from './loadMoreView';

export class ResultView extends BaseView {

    constructor () {
        super(...arguments);

        this.tplCache = {};
    }

    setupView () {
        this.el = DOM.createNode('div', {
            class: 'e-search-results'
        });

        if (this.component.options.isAbsolute)
            this.setStyle('position', 'absolute');
        
        const width = this.component.options.width === 'auto'
            ? this.component.elOffsets.width
            : this.component.options.width;
        
        this.setStyle('width', Utils.addPxToCss(width));

        if (this.component.options.layout)
            this.el = this.component.options.layout.render(this.el);

        // if (this.component.options.loadMore) {
        //     this.loadMoreBtn = new LoadMoreView(null, this.component).el;
        //
        //     this.el.appendChild(this.loadMoreBtn);
        // }
    }
    
    place () {
        const offsetParents = this.getOffsetParents();
        let top = this.component.elOffsets.top + this.component.elOffsets.height;
        let left = this.component.elOffsets.left;
        
        for (const parent of offsetParents) {
            top -= parent.offsetTop;
            left -= parent.offsetLeft;
        }
        
        this.setStyle('top', Utils.addPxToCss(top));
        this.setStyle('left', Utils.addPxToCss(left));
    }
    
    clear () {
        this.el.innerHTML = '';
    }
    
    update (items) {
        const fragment = DOM.createFragment();

        for (const item of items) {
            const itemView = new ResultItemView();
            
            itemView.render(item);

            fragment.appendChild(itemView.el);
        }

        // console.log(this.el, this.el.children);

        // this.el.insertBefore(fragment, this.loadMoreBtn);

        this.el.appendChild(new LoadMoreView(null, this.component).el);

        if (!items.length)
            this.hide();
        else
            this.show();
    }
}
