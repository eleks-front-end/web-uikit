import DOM from './common/domHelper';
import Utils from './common/utils';
import { SearchView } from './views/searchView';
import { ResultView } from './views/resultView';

export class Component {
    constructor (element, options) {
        this.el = element;
        this.setElOffsets();
        const defaults = {

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

            let name = matchAttr[1].replace(/_(.{1})/g, function (match, p1) {
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

    updateResults (items, clearItems) {
        this.results.update(items, clearItems);
    }

    clearResults () {
        this.results.clear();
    }
    //asdasd2

    render () {
        console.log('render23')
        if (!Utils.isHTMLNode(this.options.appendTo))
            this.options.appendTo = document.querySelector(this.options.appendTo);

        this.results = new ResultView(null, this);
        const search = new SearchView(this.el, this);
        console.log(this)
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
