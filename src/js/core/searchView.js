import Utils from '../common/utils';
import Logger from '../common/logger';

export default class {
    /**
     * Setup HTML element from component options: add events, sizes etc.
     * @param {HTMLElement|null} element - element from component's options
     * @param component
     */
    constructor (element = null, component) {
        this.el = element;
        this.component = component;

        this.setupEvents();
    }

    /**
     * Setter el property
     * @param {HTMLElement|null} node
     */
    set el (node) {
        if (!Utils.isHTMLNode(node)) {
            this._element = null;
            Logger.log('Value not assignable to el', 1);
        }

        this._element = node;
    }

    /**
     * Getter el property
     * @returns {HTMLElement|null}
     */
    get el () {
        return this._element;
    }

    /**
     * Add event listeners for searchView element
     */
    setupEvents () {
        let time = 500;

        // if (this.component.options.searchType === 'server')
        //     time = 500;

        const deb = Utils.debounce({
            delayed: () => {
                this.keyDownHandler(!this.el.value);
            },
            time,
            instantly: () => {
                this.component.clearResults();
            }
        });

        this.el.addEventListener('keypress', deb);
        this.el.addEventListener('paste', deb);
        this.el.addEventListener('cut', deb);
        this.el.addEventListener('keydown', e => {
            const key = e.keyCode;

            if (key !== 8 && key !== 46)
                return;

            deb();
        });
    }

    /**
     * @callback
     * Typing event callback
     * @param {boolean} clear - clear or not search results
     */
    keyDownHandler (clear) {
        if (clear)
            this.component.clearResults();

        this.component.eventsDriver.trigger('TYPED', this.el.value);
    }
}

