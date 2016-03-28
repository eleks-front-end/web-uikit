import Utils from '../common/utils';
import BaseView from './baseView';
import DOM from '../common/domHelper';
import ajaxService from '../common/ajaxService';
import TEMPLATES from '../templates/templatesNames';

export class ResultView extends BaseView {
    setupView () {
        this.el = DOM.createNode('ul', {
            class: 'e-search-results'
        });

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

            let itemTpl;

            switch (item.type) {
                case TEMPLATES.IMAGE_TEXT.name:
                    itemTpl = TEMPLATES.IMAGE_TEXT.tpl(item);
                    break;
                case TEMPLATES.TITLE_TEXT.name:
                    itemTpl = TEMPLATES.TITLE_TEXT.tpl(item);
                    break;
                default:
                    itemTpl = TEMPLATES.PLAIN_TEXT.tpl(item);
            }

            resultItemEl.innerHTML = itemTpl;
            fragment.appendChild(resultItemEl);
        }

        this.el.appendChild(fragment);
    }
}
