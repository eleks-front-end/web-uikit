import Logger from '../common/logger';
import Utils from '../common/utils';
import BaseView from './baseView';
import DOM from '../common/domHelper';
import ajaxService from '../common/ajaxService';

export class SearchView extends BaseView {
    setupView () {
        this.el = this._element;
    }

    setupEvents () {
        this.el.addEventListener('keydown', Utils.debounce({
            delayed: e => {
                this.keyDownHandler(e);
            },
            time: 1500,
            instantly: () => {
                console.log(this.component.results);
                this.component.clearResults();
            }
        }));
    }

    keyDownHandler (e) {
        let api = this.component.options.api;

        api = Utils.isArray(api) ? api : [api];
        let clearItems = true;

        for (const apiItem of api)
            ajaxService.get(apiItem.url).then((response, xhr) => {
                console.log(response);
                response = Array.from(response);
                response = response.map(item => {
                    item.type = apiItem.tpl || this.component.options.defaultTpl;
                    if (this.component.options.api.transform)
                        item = ajaxService.transformApi(apiItem.transform, item);

                    return item;
                });

                this.component.updateResults(response, clearItems);
                clearItems = false;
            }, response => {
                console.warn(response, e);
            });
    }
}

