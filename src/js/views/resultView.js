import Utils from '../common/utils';
import Logger from '../common/logger';
import BaseView from './baseView';
import DOM from '../common/domHelper';
import ajaxService from '../common/ajaxService';
import TEMPLATES from '../templates/templatesNames';

export class ResultView extends BaseView {

    constructor () {
        super(...arguments);

        this.tplCache = {};
    }

    setupView () {
        this.el = DOM.createNode('ul', {
            class: 'e-search-results'
        });

        console.log(this)
        
        if (this.component.options.isAbsolute)
            this.setStyle('position', 'absolute');
        
        const width = this.component.options.width === 'auto'
            ? this.component.elOffsets.width
            : this.component.options.width;
        
        this.setStyle('width', Utils.addPxToCss(width));
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
            const resultItemEl = DOM.createNode('li', {
                class: 'e-search-results-item'
            });
            
            let itemTpl, tpl;

            if (item.type.substr(0, 1) === '#') {
                const id = item.type.substr(1);

                if (!this.tplCache[id])
                    this.tplCache[id] = document.getElementById(id).innerHTML;

                tpl = this.tplCache[id];
            } else
                tpl = item.type;

            switch (item.type) {
                case TEMPLATES.IMAGE_TEXT.name:
                    itemTpl = TEMPLATES.IMAGE_TEXT.tpl(item);
                    break;
                case TEMPLATES.TITLE_TEXT.name:
                    itemTpl = TEMPLATES.TITLE_TEXT.tpl(item);
                    break;
                case TEMPLATES.PLAIN_TEXT.name:
                    itemTpl = TEMPLATES.PLAIN_TEXT.tpl(item);
                    break;
                default:
                    itemTpl = TEMPLATES.CUSTOM.tpl(item, tpl);
            }
            
            resultItemEl.innerHTML = itemTpl;
            fragment.appendChild(resultItemEl);
        }
        
        this.el.appendChild(fragment);
    }
}
