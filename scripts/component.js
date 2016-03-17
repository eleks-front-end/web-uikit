"use strict";

import { DOMHelper as DOM } from './common/domHelper';
import { Utils } from './common/utils';
import { SearchView } from 'views/searchView';

export default class Component {
    constructor(options) {
        this.attributes = {
            el: document.body,
            apis: [
                {
                    url: '...',
                    template: '<div><h1>{title}</h1><img src="{desc.image}"></div>',
                    apiAdapter: 'title->name;desc.image->img'
                }

            ]
        };

        Utils.extend(this.attributes, options);

        this.render();
    }

    getAttr(key) {
        return this.attributes[key];
    }

    static autoInit(className) {
        let elements = [].slice.call(document.getElementsByClassName(className));
        elements.forEach((node) => {
            new Component(); //TODO: collect and pass all data attributes as options
        });
    }

    render() {
        let el = this.getAttr('el'),
            fragment = DOM.createFragment(),
            search = new SearchView().el;

        fragment.appendChild(search);

        el.appendChild(fragment);
    }
}


//class Template {
        //    constructor(model) {
        //        this.model = model;
        //    }
        //
        //    getTemplate() {
        //        return this.template;
        //    }
        //}
        //
        //class TemplateInterpreter {
        //    constructor(template) {
        //        if (!(template instanceof Template))
        //            throw new Error('Not valid arguments');
        //
        //        this.template = template;
        //    }
        //
        //    getInterpreted() {
        //        let tpl = this.template.getTemplate(),
        //            vars = this.getTemplateVariebles();
        //
        //        for (let key in vars) {
        //            let re = new RegExp("\{" + key + "\}", 'g');
        //            tpl = tpl.replace(re, vars[key]);
        //        }
        //
        //        return tpl;
        //    }
        //
        //    getTemplateVariebles() {
        //        return [];
        //    }
        //}