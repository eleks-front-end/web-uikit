import TEMPLATES from './templatesNames';

/**
 * Class representing template agent
 * @class
 */
export default class {
    /**
     * Create template agent
     * @param {string} type - which method should use template agent
     * @param {object} options - options of template agent
     */
    constructor (type, options) {
        this.type = type;

        this.options = options;
        this.transformer = this.options.transformer;

        this.tplCache = new Set();
    }

    /**
     * Set up events driver
     * @param {object} eventsDriver - events manager
     */
    addEventsDriver (eventsDriver) {
        this.eventsDriver = eventsDriver;
    }

    /**
     * transform request's result object to object with standard properties
     * @returns {{}}
     * @private
     */
    _transform () {
        const map = {};
        const parserArr = this.transformer.split(';');

        for (const opt of parserArr) {
            const keyVal = opt.split('=>');

            map[keyVal[1]] = keyVal[0];
        }

        return map;
    }

    /**
     * Prepare request's results accordint to mapping expression
     * @param data
     * @returns {{}[]}
     * @private
     */
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

    /**
     * Set template type according to type from arguments
     * @param {object} data - request's result
     * @returns {{}[]}
     */
    getTpl (data) {
        this.itemTpl = '';

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

