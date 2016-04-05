import DOM from './common/domHelper';
import Utils from './common/utils';
import Logger from './common/logger';
import {SearchView} from './views/searchView';
import {ResultView} from './views/resultView';
import ajaxService from './common/ajaxService';
import {SearchEngine} from './search-engine/searchEngine';

export class Component {
    constructor (element, options) {
        if (!element)
            throw new TypeError(`Element is ${element}`);

        this.el = element;
        this.data = [];

        this.setElOffsets();
        const defaults = {
            searchType: 'client',
            defaultTpl: 'plainText',
            appendTo: document.body,

            width: 'auto',
            maxHeight: 300,
            zIndex: 9999,
            resultPosition: 'auto', //top, bottom, left, right
            isAbsolute: true
        };

        this.options = Object.assign({}, defaults, options);

        this.render();

        if (this.options.searchType === 'client')
            this.request();

        this.searchEngine = new SearchEngine();
    }

    setElOffsets () {
        this.elOffsets = this.el.getBoundingClientRect();
    }

    static autoInit (className) {
        const elements = [].slice.call(DOM.get(`.${className}`));

        for (const element of elements)
            new Component(element, this.grabAttrOptions(element));
    }

    static grabAttrOptions (element) {
        let options = {};

        const attrs = element.attributes;

        for (const k in attrs) {
            if (!attrs.hasOwnProperty(k))
                continue;

            const attr = attrs[k];
            const matchAttr = /^data-search-(.+)$/g.exec(attr.name);

            if (!matchAttr)
                continue;

            const name = matchAttr[1].replace(/_(.{1})/g, function (match, p1) {
                return p1.toUpperCase();
            }).split('-');

            if (name.length <= 1)
                options[name[0]] = attr.value;
            else
                this.prepareCompositeOptions(options, name, attr.value);
        }

        return options;
    }

    static prepareCompositeOptions (options, path, value) {
        var option;

        for (let i = 0, length = path.length; i < length; i++) {
            let subPath = path[i];

            if (i === path.length - 1)
                option[subPath] = value;
            else {
                options[subPath] = options[subPath] || {};
                option = options[subPath];
            }
        }
    }

    clearResults () {
        this.results.clear();
    }

    serverSearch (val) {
        this.request(val);
    }

    clientSearch (val) {
        this.results.update(this.searchEngine.updateQuery(val));
    }

    request () {
        let api = this.options.api;
        let allApiLoadded = 0;

        api = Utils.isArray(api) ? api : [api];

        for (const apiItem of api)
            ajaxService.get(apiItem.url).then((response, xhr) => {
                allApiLoadded++;
                response = Utils.isArray(response) ? response : [response];
                response = response.map(item => {
                    item.type = apiItem.tpl || this.options.defaultTpl;
                    item.id = Utils.GUID();

                    if (apiItem.transform)
                        item = ajaxService.transformApi(apiItem.transform, item);
                    return item;
                });

                if (this.options.searchType === 'server')
                    this.results.update(response);
                else
                    this.searchEngine.addDocuments(response, allApiLoadded === api.length);
            }, response => {
                console.warn(response);
            });
    }

    render () {
        if (!Utils.isHTMLNode(this.options.appendTo))
            this.options.appendTo = document.querySelector(this.options.appendTo);

        this.results = new ResultView(null, this);
        const search = new SearchView(this.el, this);

        if (this.options.isAbsolute) {
            this.options.appendTo.appendChild(this.results.el);
            this.results.place();
        }
        else if (this.options.position === 'top' || this.options.position === 'left')
            this.el.parentNode.insertBefore(this.results.el, this.el);
        else
            Utils.insertAfter(this.results.el, this.el);

    }
}
