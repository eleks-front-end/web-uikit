import Utils from './utils';

export default class {
    constructor (options) {
        this.events = {
            READY_STATE_CHANGE: 'readystatechange',
            LOAD_START: 'loadstart',
            PROGRESS: 'progress',
            ABORT: 'abort',
            ERROR: 'error',
            LOAD: 'load',
            TIMEOUT: 'timeout',
            LOAD_END: 'loadend'
        };

        const defaults = {
            headers: {
                'Content-Type': 'application/json'
            },
            json: true
        };

        this.options = Object.assign({}, defaults, options);
    }

    send (url, method, data) {
        return new Promise((resolve, reject) => {
            method = method || 'GET';
            const xhr = new XMLHttpRequest();
            const headers = this.options.headers;

            xhr.open(method, url);

            for (const headerName in headers) {
                if (!headers.hasOwnProperty(headerName))
                    continue;

                xhr.setRequestHeader(headerName, headers[headerName]);
            }

            if (this.options.withCredentials)
                xhr.withCredentials = true;

            data = data ? this.parseData(data) : null;

            xhr.addEventListener(this.events.LOAD, () => {
                if (xhr.status >= 200 && xhr.status <= 300 && xhr.status === 0)
                    resolve(this.parseResponse(xhr), xhr);
                else
                    reject(this.parseResponse(xhr));
            });

            xhr.addEventListener(this.events.ERROR, () => this.parseResponse(xhr));

            xhr.addEventListener(this.events.TIMEOUT, () => this.parseResponse(xhr));

            xhr.addEventListener(this.events.ABORT, () => this.parseResponse(xhr));

            data ? xhr.send(data) : xhr.send();
        });
    }

    parseResponse (xhr) {
        let responseText = '';

        if (xhr.responseText)
            responseText = this.options.json ? JSON.parse(xhr.responseText) : xhr.responseText;

        return responseText;
    }

    parseData (data) {
        if (this.options.headers['Content-Type'] === 'application/json')
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

    get (url) {
        return this.send(url);
    }

    post (url, data) {
        return this.send(url, 'POST', data);
    }

}
