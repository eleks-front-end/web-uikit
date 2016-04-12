import ajax from './sa-ajax';

export default class {
    constructor (type, options) {
        this.type = type;
        
        const defaults = {
            method: 'GET'
        };
        
        this.options = Object.assign({}, defaults, options);
        
    }
    
    search (query) {
        this.options.query = query;

        let promise;

        switch (this.type) {
            case 'searchByServer':
                promise = this.searchByServer();
                break;
            case 'searchByClient':
                promise = this.searchByClient();
                break;
            default:
                promise = this.ajax();
        }

        return promise;
    }

    searchByClient () {

    }
    
    searchByServer () {
        return ajax.get(this.options.url, this.options.data, this.options);
    }
    
    ajax () {
        return ajax.send(this.options.url, this.options.method, this.options.data, this.options);
    }
    
}
