const ajaxService = (() => {
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

    const setHeaders = (xhr, headers) => {
        for (const headerName in headers) {
            if (!headers.hasOwnProperty(headerName))
                continue;

            xhr.setRequestHeader(headerName, headers[headerName]);
        }
    };

    const parseResponse = (xhr, isJson) => {
        let responseText = '';

        if (xhr.responseText)
            responseText = isJson ? JSON.parse(xhr.responseText) : xhr.responseText;

        return responseText;
    };

    const setupEventListeners = (xhr, resolve, reject, isJson) => {
        let errorHandler = () => {
            reject(parseResponse(xhr, isJson));
        };

        xhr[EVENTS.READY_STATE_CHANGE] = () => {
            if(xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status <= 300)
                    resolve(parseResponse(xhr, isJson), xhr);
                else {
                    errorHandler();
                }
            }
        };

        xhr.addEventListener(EVENTS.ERROR, () => errorHandler);

        xhr.addEventListener(EVENTS.TIMEOUT, () => errorHandler);

        xhr.addEventListener(EVENTS.ABORT, () => errorHandler);
    };

    const parseData = (data, headers) => {
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
    };

    const sendRequest = (url, method = 'GET', data, resolve, reject, async = true, options) => {
        let ajaxOptions = Object.assign({}, DEFAULTS, options);
        const xhr = (() => {
            let xmlhttp = null;
            try {
                xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (E) {
                    xmlhttp = false;
                }
            }
            if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
                xmlhttp = new XMLHttpRequest();
            }
            return xmlhttp;
        })();
        xhr.open(method, url, async);

        setHeaders(xhr, ajaxOptions.headers);

        if (ajaxOptions.withCredentials)
            xhr.withCredentials = true;

        data = data ? parseData(data, options.headers) : null;

        setupEventListeners(xhr, resolve, reject, ajaxOptions.json);

        data ? xhr.send(data) : xhr.send();

    };

    return {
        send (url, method, data, options) {
            return new Promise((resolve, reject) => {
                try {
                    sendRequest(url, method, data, resolve, reject, options);
                } catch (e) {
                    reject(e);
                }
            });
        },

        get (url) {
            return this.send(url);
        },

        post (url, data) {
            return this.send(url, 'POST', data);
        }
    }
})();

export default ajaxService;
