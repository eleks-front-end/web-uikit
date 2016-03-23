export default (() => {
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

    const DEFAULTS = {
        headers: {
            'Content-Type': 'application/json'
        },
        json: true,
        withCredentials: false
    };

    const service = {
        send: Send,
        get: Get,
        post: Post
    };

    return service;

    function Send (url, method, data, options) {
        return new Promise((resolve, reject) => {
            try {
                _sendRequest(url, method, data, resolve, reject, options);
            } catch (e) {
                reject(e);
            }
        });
    }

    function Get (url, data, options) {
        return Send(url, 'GET', data, options);
    }

    function Post (url, data, options) {
        return Send(url, 'POST', data, options);
    }

    function _sendRequest (url, method = 'GET', data, resolve, reject, async = true, options) {
        let ajaxOptions = Object.assign({}, DEFAULTS, options);
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, async);

        _setHeaders(xhr, ajaxOptions.headers);

        if (ajaxOptions.withCredentials)
            xhr.withCredentials = true;

        data = data ? _parseData(data, options.headers) : null;

        _setupEventListeners(xhr, resolve, reject, ajaxOptions.json);

        data ? xhr.send(data) : xhr.send();
    }

    function _setHeaders (xhr, headers) {
        for (const headerName in headers) {
            if (!headers.hasOwnProperty(headerName))
                continue;

            xhr.setRequestHeader(headerName, headers[headerName]);
        }
    }

    function _parseData (data, headers) {
        if (headers['Content-Type'] === 'application/json')
            return JSON.stringify(data);

        var query = [];
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

    function _setupEventListeners (xhr, resolve, reject, isJson) {
        const errorHandler = () => {
            reject(_parseResponse(xhr, isJson));
        };

        xhr[EVENTS.READY_STATE_CHANGE] = () => {
            if(xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status <= 300)
                    resolve(_parseResponse(xhr, isJson), xhr);
                else {
                    errorHandler();
                }
            }
        };

        xhr.addEventListener(EVENTS.ERROR, () => errorHandler);

        xhr.addEventListener(EVENTS.TIMEOUT, () => errorHandler);

        xhr.addEventListener(EVENTS.ABORT, () => errorHandler);
    }

    function _parseResponse (xhr, isJson) {
        let responseText = '';

        if (xhr.responseText)
            responseText = isJson ? JSON.parse(xhr.responseText) : xhr.responseText;

        return responseText;
    }
})();