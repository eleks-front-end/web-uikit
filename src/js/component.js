import DOM from './common/domHelper';
import Utils from './common/utils';
import { SearchView } from './views/searchView';

export class Component {
    constructor (element, options) {
        this.el = element;
        const defaults = {
            width: 'auto',
            maxHeight: 300,
            zIndex: 9999,
            defaultTpl: 'plainText'
        };

        this.options = Object.assign({}, defaults, options);
        console.log(this)
        this.render();
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

            let name = matchAttr[1].split('-');

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

    render () {
        let search = new SearchView(this.el, this.options);
        //let results = new ResultView() //TODO should be here
    }
}
