/**
 * Created by Dmytro on 4/9/2016.
 */
export default class {
    constructor () {
        this.eventsMap = {};
    }

    _find (array, predicate) {
        if (!array || !array.length)
            return false;

        return array.find(predicate);
    }

    once (eventName, handler, context) {
        return this.on(...arguments, true);
    }

    on (eventName, handler, context, once) {

        let _once = once && typeof once === 'boolean';
        const listeners = this.eventsMap[eventName],
            isExistListener = this._find(listeners, function (listener) {
                return listener.handler === handler && listener.caller === context;
            });

        if (isExistListener)
            return this;

        let listener = {
            handler: handler,
            caller: context
        };

        if (once && typeof once === 'boolean')
            listener.once = once;

        if (listeners)
            this.eventsMap[eventName].push(listener);
        else
            this.eventsMap[eventName] = [listener];

        return this;
    }

    off (eventName, handler, context) {
        const listeners = this.eventsMap[eventName];

        if (!listeners || !listeners.length)
            return this;

        if (listeners && !handler) {
            delete this.eventsMap[eventName];
            return this;
        }

        for (let i = 0, l = listeners.length; i < l; ++i) {
            const listener = listeners[i];

            if (listener.handler === handler && listener.caller === context) {
                listeners.splice(i, 1);
                break;
            }
        }

        return this;
    }

    trigger (eventName, ...args) {
        const listeners = this.eventsMap[eventName];

        if (!listeners || !listeners.length) {
            console.warn(`${this._toString()}::The event ${eventName} was triggered, but handler didn\'t fired.`);
            return this;
        }

        for (let i = 0, l = listeners.length; i < l; ++i) {
            this._dispatch(listeners[i], arguments);
            if (listeners[i].once)
                listeners.splice(i, 1);
        }

        return this;
    }

    _dispatch (listener, args) {
        const _args = [].slice.call(args);

        listener.handler.call(listener.caller, ..._args);
    }

    _toString () {
        return [['EventDriver']];
    }
}

