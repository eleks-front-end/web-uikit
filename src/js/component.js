import DOM from './common/domHelper';
import Utils from './common/utils';
import EventDriver from './common/eventDriver';
import SearchView from './core/searchView';

/**
 * Class representing main Component
 */
export class Component {
    /**
     * Create a component
     * @param {HTMLElement} element - HTML node
     * @param options
     */
    constructor (element, options) {
        if (!element)
            throw new TypeError(`Element is ${element}`);

        this.el = element;
        this.data = [];
        this.eventsDriver = new EventDriver();

        this.setElOffsets();

        const defaults = {
            searchType: 'client',
            defaultTpl: 'plainText',
            appendTo: document.body,
            keywordName: 'query',
            width: 'auto',
            maxHeight: 300,
            zIndex: 9999,
            resultPosition: 'auto', //top, bottom, left, right
            isAbsolute: true,
            loadMore: {
                text: 'Load More'
            }
        };

        this.options = Object.assign({}, defaults, options);

        this.render();
    }

    /**
     * Set element offsets
     */
    setElOffsets () {
        this.elOffsets = this.el.getBoundingClientRect();
    }

    /**
     * Autoinitialize Component
     * @param {string} className - autoinitialize className
     */
    static autoInit (className) {
        const elements = [].slice.call(DOM.get(`.${className}`));

        for (const element of elements)
            new Component(element, this.grabAttrOptions(element));
    }

    /**
     *
     * @param {HTMLElement} element
     * @returns {object} - collected options from HTML element's attributes
     */
    static grabAttrOptions (element) {
        const options = {};

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
                this.prepareNestedOptions(options, name, attr.value);
        }

        return options;
    }

    /**
     * Parse and write nested options
     * @param {object} options - collection of options where to write nested options
     * @param {string} path - object's nesting
     * @param {string} value - option value
     */
    static prepareNestedOptions (options, path, value) {
        var option;

        for (let i = 0, length = path.length; i < length; i++) {
            const subPath = path[i];

            if (i === path.length - 1)
                option[subPath] = value;
            else {
                options[subPath] = options[subPath] || {};
                option = options[subPath];
            }
        }
    }

    /**
     * Clear results view
     */
    clearResults () {
        this.eventsDriver.trigger('CLEAR_RESULTS');
    }

    /**
     * Search via SearchAgent
     * @param {string} query - query typed into search input
     */
    search (query = this.query) {
        this.query = query;
        let api = this.options.api;

        api = Utils.isArray(api) ? api : [api];

        for (const apiItem of api) {
            const result = apiItem.searchAgent.search(this.query);

            if (result.then)
                result.then(data => {
                    const templatedItems = apiItem.templateAgent.getTpl(data);

                    this.options.layout.update(templatedItems);
                });
            else
                this.options.layout.update(apiItem.templateAgent.getTpl(result));
        }
    }

    /**
     * Render result and search views
     */
    render () {
        if (!Utils.isHTMLNode(this.options.appendTo))
            this.options.appendTo = document.querySelector(this.options.appendTo);

        const searchView = new SearchView(this.el, this);
    }
}
