import TEMPLATES from './templatesNames';

export default class {
    constructor (type, options) {
        this.type = type;

        this.options = options;
        this.transformer = this.options.transformer;

        this.tplCache = new Set();
    }

    _transform () {
        const map = {};
        const parserArr = this.transformer.split(';');

        for (const opt of parserArr) {
            const keyVal = opt.split('=>');

            map[keyVal[1]] = keyVal[0];
        }

        return map;
    }

    _prepareData (data) {
        return data.map(item => {
            item = new Proxy(item, {
                get: (target, name) => {
                    const parser = this._transform();

                    return target[name] || target[parser[name]] || '';
                }
            });

            item = this.itemTpl(item);

            return item;
        });
    }
    
    getTpl (data) {
        this.itemTpl = '';
        console.log(this.type);
        switch (this.type) {
            case TEMPLATES.IMAGE_TEXT.name:
                this.itemTpl = TEMPLATES.IMAGE_TEXT.tpl;
                break;
            case TEMPLATES.TITLE_TEXT.name:
                this.itemTpl = TEMPLATES.TITLE_TEXT.tpl;
                break;
            case TEMPLATES.PLAIN_TEXT.name:
                this.itemTpl = TEMPLATES.PLAIN_TEXT.tpl;
                break;
            case TEMPLATES.BY_SELECTOR.name:
                this.itemTpl = TEMPLATES.BY_SELECTOR.tpl;
                break;
            default:
                this.itemTpl = TEMPLATES.CUSTOM.tpl;
        }

        data = this._prepareData(data);

        return data;
    }
}

