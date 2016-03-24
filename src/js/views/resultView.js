import Logger from '../common/logger';
import BaseView from './baseView';
import DOM from '../common/domHelper';
import ajaxService from '../common/ajaxService';
import TEMPLATES from '../templates/templatesNames';

export class ResultView extends BaseView {
    setupView () {
        this.el = DOM.createNode('ul', {
            class: 'e-search-results'
        });
    }

    clear () {
        this.el.innerHTML = '';
    }

    updateView (items) {
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
