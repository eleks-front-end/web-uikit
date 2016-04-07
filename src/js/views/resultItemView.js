import BaseView from './baseView';
import DOM from '../common/domHelper';
import TEMPLATES from '../templates/templatesNames';

export default class ResultItemView extends BaseView {

    setupView () {
        this.el = DOM.createNode('li', {
            class: 'e-search-results-item'
        });
    }

    render (data, cache) {
        this.data = data;
        let itemTpl, tpl;

        if (this.data.type.substr(0, 1) === '#') {
            const id = this.data.type.substr(1);

            if (!cache[id])
                cache[id] = document.getElementById(id).innerHTML;

            tpl = cache[id];
        } else
            tpl = this.data.type;

        switch (this.data.type) {
            case TEMPLATES.IMAGE_TEXT.name:
                itemTpl = TEMPLATES.IMAGE_TEXT.tpl(this.data);
                break;
            case TEMPLATES.TITLE_TEXT.name:
                itemTpl = TEMPLATES.TITLE_TEXT.tpl(this.data);
                break;
            case TEMPLATES.PLAIN_TEXT.name:
                itemTpl = TEMPLATES.PLAIN_TEXT.tpl(this.data);
                break;
            default:
                itemTpl = TEMPLATES.CUSTOM.tpl(this.data, tpl);
        }

        this.el.innerHTML = itemTpl;
    }
}