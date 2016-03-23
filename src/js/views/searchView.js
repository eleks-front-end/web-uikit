import Logger from '../common/logger';
import Utils from '../common/utils';
import BaseView from './baseView';
import DOM from '../common/domHelper';
import ajaxService from '../common/ajaxService';
import { ResultView } from './resultView';

export class SearchView extends BaseView {
    setupView () {
        //this.el = DOM.createNode('input', {
        //    type: 'search',
        //    id: 'search'
        //});

        this.resultView = new ResultView();
    }

    setupEvents () {
        this.el.addEventListener('keydown', e => {
            this.keyDownHandler(e);
        });
    }

    keyDownHandler (e) {
        //TODO - need debounce implements
        let api = this.options.api;
        if (Utils.isArray(api))
            for (let apiItem of api)
                ajaxService.get(apiItem.url).then((response, xhr) => {
                    response = Array.from(response);
                    response.map(item => {
                        item.type = apiItem.tpl || this.options.defaultTpl;

                        return item;
                    });
                    console.log(response)
                    this.resultView.updateView(response);
                }, response => {
                    console.log(response, e);
                });
        else
            ajaxService.get(api.url).then((response, xhr) => {
                response = Array.from(response);
                response.map(item => {
                    item.type = api.tpl || this.options.defaultTpl;
                    item = SearchView.transformApi(this.options.api.transform, item);
                    return item;
                });
                this.resultView.updateView(response);
            }, response => {
                console.log(response, e);
            });
    }

    static transformApi (parser, obj) {
        const map = {};
        const parserArr = parser.split(';');
        const transformed = {};

        for (const opt of parserArr) {
            const keyVal = opt.split('=>');
            map[keyVal[0]] = keyVal[1];
        }

        for (let key in obj) {
            if (!obj.hasOwnProperty(key) || !map[key])
                continue;

            transformed[map[key]] = obj[key];
        }

        return transformed;
    }
}
