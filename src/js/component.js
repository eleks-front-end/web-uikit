import DOM from './common/domHelper';
import Utils from './common/utils';
import { SearchView } from './views/searchView';

export class Component {
    constructor (element, options) {
        console.log(element, options);
        this.element = element;
        const defaults = {
            appendTo: document.body,
            width: 'auto',
            maxHeight: 300,
            zIndex: 9999
        };

        this.options = Object.assign({}, defaults, options);

        this.render();
    }

    static autoInit (className) {
        const elements = document.querySelectorAll(`.${className}`);

        for (const element of elements) {
            new Component(element, this.grabAttrOptions(element));
            console.log(this.grabAttrOptions(element));
        }
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

            options[matchAttr[1]] = attr.value;
        }

        return options;
    }

    render () {
        //let el = this.getAttr('el'),
        //    fragment = DOM.createFragment(),
        //    search = new SearchView().el;
        //
        //fragment.appendChild(search);
        //
        //el.appendChild(fragment);
    }
}
