import Logger from '../common/logger';
import BaseView from './baseView';
import DOM from '../common/domHelper';
import ajaxService from '../common/ajaxService';

export class SearchView extends BaseView {
    setupView() {
        this.el = DOM.createNode('input', {
            type: 'search',
            id: 'search'
        });
    }

    setupEvents() {
        this.el.addEventListener('keydown', this.keyDownHandler);
    }

    keyDownHandler(e) {
        //TODO - need debounce implements
        ajaxService.get('http://api-mockapitron.rhcloud.com/?size=3&name=name&address=address').then((response, xhr) => {
            console.log(response);
        }, (e) => {
            console.log(e)
        });
    }
}
