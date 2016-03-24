import Logger from '../common/logger';
import Utils from '../common/utils';
import BaseView from './baseView';
import DOM from '../common/domHelper';
import ajaxService from '../common/ajaxService';
import { ResultView } from './resultView';

export class SearchView extends BaseView {
    setupView () {
        this.el = this._element;

        this.resultView = new ResultView(); //TODO SearchView shouldn't know about Result
    }

    setupEvents () {
        this.el.addEventListener('keydown', e => {
            this.component.clearResults();

            Utils.debounce(() => {
                this.keyDownHandler(e);
            }, 1500)();
        });
    }

    keyDownHandler (e) {
        let api = this.component.options.api;

        api = Utils.isArray(api) ? api : [api];
        let clearItems = true;

        for (const apiItem of api)
            ajaxService.get(apiItem.url).then((response, xhr) => {
                response = Array.from(response);
                response = response.map(item => {
                    item.type = apiItem.tpl || this.component.options.defaultTpl;
                    if (this.component.options.api.transform)
                        item = ajaxService.transformApi(apiItem.transform, item);

                    return item;
                });

                console.log(response);

                this.component.updateResults(response, clearItems);
                clearItems = false;
            }, response => {
                console.warn(response, e);
            });
    }
}

