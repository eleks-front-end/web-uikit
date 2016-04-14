import ajax from './sa-ajax';

/**
 * Class representing a search mechanism
 */
export default class {
    /**
     * create a search agent
     * @param {string} type - what type of search agent should be used
     * @param {object} options
     */
    constructor (type, options) {
        this.type = type;
        
        const defaults = {
            method: 'GET'
        };
        
        this.options = Object.assign({}, defaults, options);
    }

    /**
     * Choose search agent method. Depends on type
     * @param {string} query - typed query in search input
     * @returns {promise}
     */
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
    
    /**
     * Implementation of client search
     */
    searchByClient () {

    }
    
    /**
     * Implementation of server search
     * @returns {promise} - return promise of request
     */
    searchByServer () {
        return ajax.get(this.options.url, this.options.data, this.options);
    }
    
    /**
     * Implementation http request
     * @returns {promise} - return promise of request
     */
    ajax () {
        return ajax.send(this.options.url, this.options.method, this.options.data, this.options);
    }
    
}
