"use strict";

import { Logger } from '../common/logger';
import { BaseView } from 'baseView';
import { DOMHelper as DOM} from '../common/domHelper';

export class SearchView extends BaseView {
    constructor() {
        super();
    }

    setupView() {
        this.el = DOM.createNode('input', {
            type: 'text',
            id: 'search',
            name: this.id
        });
    }
}