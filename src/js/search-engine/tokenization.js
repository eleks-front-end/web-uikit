import Utils from '../common/utils';

export default class {
    constructor (separator) {
        this.separator = separator;
    }

    tokenize (documents) {
        const wordStore = new Set();
        const tokenStore = {};
        let temp = tokenStore;

        for (const document of documents) {
            const tokens = this.separate(this.stringify(document));

            for (const token of tokens) {
                wordStore.add(token);
                for (let i = 0, length = token.length; i < length; i++) {
                    const letter = token[i];

                    temp[letter] = temp[letter] || {};

                    if (i === length - 1) {
                        temp[letter].docs = temp[letter].docs || new Set();
                        temp[letter].docs.add(document.id);
                        temp = tokenStore;
                    } else
                        temp = temp[letter];
                }
            }
        }

        return {
            wordStore: wordStore,
            tokenStore: tokenStore
        };
    }

    stringify (document) {
        let str = '';

        for (const key in document) {
            if (!document.hasOwnProperty(key) || key === 'id' || key === 'type')
                continue;
            str += document[key] + ' ';
        }

        return str.toLowerCase();
    }

    separate (string) {
        string.replace(/[.,;:]/g, '');
        return string.split(new RegExp(this.separator, 'g'));
    }
}
