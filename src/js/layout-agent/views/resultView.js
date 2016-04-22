import Utils from '../../common/utils';
import BaseView from './baseView';
import DOM from '../../common/domHelper';
import {ResultViewHeader, ResultViewContent, ResultViewFooter} from './resultViewParts';

/**
 * Class representing result view
 * @class
 */
export default class extends BaseView {
    /**
     * create result view which extends on {BaseView}
     * @param {{}} eventsDriver - events driver for communication between layout sub-components
     * @param {{}} options - layout agents options
     */
    constructor (eventsDriver, options) {
        super(eventsDriver, options);
        
        this.header = new ResultViewHeader(this.eventsDriver);
        this.footer = new ResultViewFooter(this.eventsDriver);
        this.content = new ResultViewContent(this.eventsDriver);

        this.tplCache = {};

        if (!Utils.isHTMLNode(this.options.appendTo))
            this.options.appendTo = document.querySelector(this.options.appendTo);

        this.options.appendTo.appendChild(this.el);

        this.setupStructure();
    }

    /**
     * create an HTMLElement and setup some styles depends in options
     */
    setupView () {
        this.el = DOM.createNode('div', {
            class: 'e-search-results'
        });

        if (this.options.isAbsolute)
            this.setStyle('position', 'absolute');
    }

    /**
     * setup direct children
     */
    setupStructure () {
        this.appendChild(this.header.el);
        this.appendChild(this.content.el);
        this.appendChild(this.footer.el);

        if(this.options.header)
            this.header.el.innerHTML = this.options.header;
    }

    /**
     * place result view relatively to search input, also depends on options
     * @param inputOffsets
     */
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

        let width;

        if (this.options.width === 'auto')
            width = inputOffsets.width;
        else
            width = this.options.width;

        this.setStyle('width', Utils.addPxToCss(width));

        let height = 300;

        if (this.options.maxHeight === 'window')
            height = window.innerHeight - this.el.getBoundingClientRect().top;

        this.setStyle('height', Utils.addPxToCss(height));
    }

    /**
     * clear search results
     */
    clear () {
        this.content.el.innerHTML = '';
    }
}
