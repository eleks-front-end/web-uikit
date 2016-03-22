import Logger from '../common/logger';
import BaseView from './baseView';
import { DOM } from '../common/domHelper';

export class SearchView extends BaseView {
    setupView () {
        this.el = DOM.createNode('input', {
            type: 'text',
            id: 'search',
            name: this.id
        });
    }
}
