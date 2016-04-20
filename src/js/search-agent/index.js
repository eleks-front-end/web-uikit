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
        
        this.updateURL();
    }
    
    /**
     * Past params to url from options
     */
    updateURL () {
        const queryParams = this.options.queryParams;
        let url = this.options.url;
        
        if (/\?$/.test(url))
            url += '?';
        
        for (const param in queryParams) {
            if (!queryParams.hasOwnProperty(param))
                continue;
            
            if (new RegExp(`${param}=`).test(url))
                url = url.replace(new RegExp(`(${param}=)([^&]+)`), `$1${queryParams[param]}`);
            else
                url += `&${param}=${queryParams[param]}`;
        }
        
        this.options.url = url;
    }
    
    loadMore () {
        const loadMoreProp = this.options.loadMore;

        this.options.queryParams[loadMoreProp]++;

        this.updateURL();
        this.search();
    }
    
    /**
     * Choose search agent method. Depends on type
     * @param {string} query - typed query in search input
     * @param {object} tplAgent - tpl which parse response
     */
    search (query = this.options.query, tplAgent = this.tplAgent) {
        this.options.query = query;
        this.tplAgent = tplAgent;

        let promise;
        
        if (!/query=/.test(this.options.url))
            this.options.url += `&query=${query}`;
        
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
        
        promise.then(result => {
            this.eventsDriver.trigger('RESULTS_LOADED', result, tplAgent);
        });
    }
    
    /**
     * Set up events driver
     * @param {object} eventsDriver - events manager
     */
    addEventsDriver (eventsDriver) {
        this.eventsDriver = eventsDriver;
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
