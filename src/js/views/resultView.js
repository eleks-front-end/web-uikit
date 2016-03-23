import Logger from '../common/logger';
import BaseView from './baseView';
import DOM from '../common/domHelper';
import ajaxService from '../common/ajaxService';
import TEMPLATES from '../templates/templatesNames';

//let instance = null;

export class ResultView extends BaseView {
    constructor () {
        super();

        //if (!instance)
        //    instance = this;
        //
        //return instance;
    }

    setupView () {
        this.el = DOM.createNode('ul', {
            class: 'e-search-results'
        });
    }

    updateView (items) {
        const resultItemEl = DOM.createNode('li', {
            class: 'e-search-results-item'
        });

        const fragment = DOM.createFragment();

        for (const item of items) {
            let itemTpl;
            console.log(item)
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

            console.log(itemTpl)

            resultItemEl.innerHTML = itemTpl;
            fragment.appendChild(resultItemEl);
        }

        this.el.appendChild(fragment);
        console.log(this.el)
    }
}
