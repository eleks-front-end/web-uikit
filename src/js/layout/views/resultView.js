import Utils from '../../common/utils';
import BaseView from './baseView';
import DOM from '../../common/domHelper';
import {ResultViewHeader, ResultViewContent, ResultViewFooter} from './resultViewParts';

export default class extends BaseView {

    constructor () {
        super(...arguments);
        
        this.header = new ResultViewHeader();
        this.footer = new ResultViewFooter();
        this.content = new ResultViewContent();

        this.tplCache = {};

        if (!Utils.isHTMLNode(this.options.appendTo))
            this.options.appendTo = document.querySelector(this.options.appendTo);

        this.options.appendTo.appendChild(this.el)

        this.setupStructure();
    }

    setupView () {
        this.el = DOM.createNode('div', {
            class: 'e-search-results'
        });
        
        if (this.options.isAbsolute)
            this.setStyle('position', 'absolute');
        console.log(this.options);
        // const width = this.options.width === 'auto'
        //     ? this.options.inputOffsets.width
        //     : this.options.width;
        
        // this.setStyle('width', Utils.addPxToCss(width));
    }

    setupStructure () {
        this.appendChild(this.header.el);
        this.appendChild(this.content.el);
        this.appendChild(this.footer.el);
    }

    place (inputOffsets) {
        const offsetParents = this.getOffsetParents();
        let top = inputOffsets.top + inputOffsets.height;
        let left = inputOffsets.left;
        
        for (const parent of offsetParents) {
            top -= parent.offsetTop;
            left -= parent.offsetLeft;
        }
        
        this.setStyle('top', Utils.addPxToCss(top));
        this.setStyle('left', Utils.addPxToCss(left));
    }
    
    clear () {
        this.content.el.innerHTML = '';
    }
}
