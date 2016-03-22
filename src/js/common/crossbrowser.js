import Logger from './logger';
import Utils from './utils';

export default () => {
    if (Utils.isUndefined(NodeList.prototype[Symbol.iterator]))
        NodeList.prototype[Symbol.iterator] = function () {
            var i = 0;

            return {
                next: () => ({done: i >= this.length, value: this.item(i++)})
            };
        };
};

