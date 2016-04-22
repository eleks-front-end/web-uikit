/**
 * Implementation of http request as singleton
 *
 * returns {object}
 */
export default (() => {
    /**
     * Events names
     * @type {{READY_STATE_CHANGE: string, LOAD_START: string, PROGRESS: string, ABORT: string, ERROR: string, LOAD: string, TIMEOUT: string, LOAD_END: string}}
     */
    const EVENTS = {
        READY_STATE_CHANGE: 'onreadystatechange',
        LOAD_START: 'loadstart',
        PROGRESS: 'progress',
        ABORT: 'abort',
        ERROR: 'error',
        LOAD: 'load',
        TIMEOUT: 'timeout',
        LOAD_END: 'loadend'
    };

    const xhrActionTable = {};

    /**
     * Defaults options
     * @type {{headers: {Content-Type: string}, json: boolean, withCredentials: boolean}}
     */
    const DEFAULTS = {
        headers: {
            'Content-Type': 'application/json'
        },
        json: true,
        withCredentials: false
    };

    return {
        send: Send,
        get: Get,
        post: Post,
        parseTransform: parseTransform
    };

    /**
     * Create key map for synch between custom and default properties names
     * @param {string} parser - string which describe dependencies between properties
     * @returns {object}
     */
    function parseTransform (parser) {
        const map = {};
        const parserArr = parser.split(';');

        for (const opt of parserArr) {
            const keyVal = opt.split('=>');

            map[keyVal[1]] = keyVal[0];
        }

        return map;
    }

    /**
     * Create promise
     * @param {string} url
     * @param {string} method
     * @param {object} data
     * @param {object} options
     * @param {object} xhrStore
     * @returns {Promise}
     * @constructor
     */
    function Send (url, method, data, options, xhrStore) {
        return new Promise(function (resolve, reject) {
            try {
               _sendRequest(url, method, data, resolve, reject, options, xhrStore);
            } catch (e) {
                reject(e);
            }
        });
    }

    /**
     * Shortcut for GET request
     * @param {string} url
     * @param {object} data
     * @param {object} options
     * @param {object} xhrStore
     * @returns {Promise}
     * @constructor
     */
    function Get (url, data, options, xhrStore) {
        return Send(url, 'GET', data, options, xhrStore);
    }

    /**
     * Shortcut for POST request
     * @param {string} url
     * @param {object} data
     * @param {object} options
     * @param {object} xhrStore
     * @returns {Promise}
     * @constructor
     */
    function Post (url, data, options, xhrStore) {
        return Send(url, 'POST', data, options, xhrStore);
    }

    /**
     * Create HTTPRequest
     * @param {string} url
     * @param {string} method
     * @param {object} data
     * @param {callback} resolve
     * @param {callback} reject
     * @param {boolean} async
     * @param {object} options
     * @param {object} xhrStore
     * @private
     */
    function _sendRequest (url, method = 'GET', data, resolve, reject, options, xhrStore, async = true) {
        const ajaxOptions = Object.assign({}, DEFAULTS, options);
        console.log(xhrStore);
        if (xhrStore.xhr) {
            xhrStore.xhr.abort();
            xhrStore.xhr = null;
        }

        const xhr = new XMLHttpRequest();

        xhr.open(method, url, async);

        _setHeaders(xhr, ajaxOptions.headers);

        if (ajaxOptions.withCredentials)
            xhr.withCredentials = true;

        data = data ? _parseData(data, ajaxOptions.headers) : null;

        _setupEventListeners(xhr, resolve, reject, ajaxOptions.json);

        data ? xhr.send(data) : xhr.send();

        xhrStore.xhr = xhr;
    }

    /**
     * Set headers of HTTPRequest
     * @param {XMLHttpRequest} xhr
     * @param {object} headers
     * @private
     */
    function _setHeaders (xhr, headers) {
        for (const headerName in headers) {
            if (!headers.hasOwnProperty(headerName))
                continue;

            xhr.setRequestHeader(headerName, headers[headerName]);
        }
    }

    /**
     * Parse data to query parameters
     * @param {object} data
     * @param {object} headers
     * @returns {string}
     * @private
     */
    function _parseData (data, headers) {
        if (headers['Content-Type'] === 'application/json')
            return JSON.stringify(data);

        const query = [];

        if ((typeof data).toLowerCase() === 'string' || (typeof data).toLowerCase() === 'number')
            query.push(data);
        else
            for (const k in data) {
                if (!data.hasOwnProperty(k))
                    continue;

                query.push(`${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`);
            }

        return query.join('&');
    }

    /**
     * Add event listeners
     * @param {XMLHttpRequest} xhr
     * @param {callback} resolve
     * @param {callback} reject
     * @param {boolean} isJson
     * @private
     */
    function _setupEventListeners (xhr, resolve, reject, isJson) {
        const errorHandler = () => {
            reject(_parseResponse(xhr, isJson), xhr);
        };

        xhr[EVENTS.READY_STATE_CHANGE] = () => {
            if (xhr.readyState === 4)
                if (xhr.status >= 200 && xhr.status <= 300)
                    resolve(_parseResponse(xhr, isJson), xhr);
                else
                    errorHandler();
        };

        xhr.addEventListener(EVENTS.ERROR, () => errorHandler);

        xhr.addEventListener(EVENTS.TIMEOUT, () => errorHandler);

        xhr.addEventListener(EVENTS.ABORT, () => errorHandler);
    }

    /**
     * Parse response to JSON if needed
     * @param {XMLHttpRequest} xhr
     * @param {boolean} isJson
     * @returns {string}
     * @private
     */
    function _parseResponse (xhr, isJson) {
        let responseText = '';

        if (xhr.responseText)
            responseText = isJson ? JSON.parse(xhr.responseText) : xhr.responseText;

        return responseText;
    }
})();
