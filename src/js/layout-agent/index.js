export default class {

    constructor (type, options) {
        this.type = type;

        this.options = options;
    }

    render (el) {
        this.el = el;

        switch (this.type) {
            case 'multiColumn':
                this.multiColumn();
                break;
            default:
                this.ajax();
        }

        return this.el;
    }

    multiColumn () {
        const prefix = this.prefix;

        if (!this.options.columnCount)
            return false;

        this.addStyle(prefix('column-count'), this.options.columnCount);

        if (this.options.columnGap)
            this.addStyle(prefix('column-gap'), this.options.columnGap);

        if (this.options.columnRule)
            this.addStyle(prefix('column-rule'), this.options.columnRule);
    }

    addStyle (name, value) {
        this.el.style[name] = value;
    }

    prefix (name) {
        const styles = window.getComputedStyle(document.documentElement, '');

        return Array.prototype.slice
            .call(styles)
            .join(' ')
            .match(new RegExp(`(-\\w+-)?${name}`))[0];
    }
}
