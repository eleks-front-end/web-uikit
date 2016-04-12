import Utils from '../common/utils';
import Tokenization from './tokenization';
import stemming from './stemming';

export class SearchEngine {
    constructor (options) {
        this.allLoaded = false;

        this.searchedDocs = new Set();
        this.documents = [];
        this.wordStore = [];
        this.tokenStore = {};

        const defaults = {
            separator: '[\\s\\-]+'
        };

        this.options = Object.assign({}, defaults, options);

        this.tokenization = new Tokenization(this.options.separator);
    }

    addDocuments (documents, final) {
        this.documents = this.documents.concat(documents);

        const stores = this.tokenization.tokenize(documents);

        this.wordStore = new Set([...this.wordStore, ...stores.wordStore]);
        this.mergeTokenStores(this.tokenStore, stores.tokenStore);

        this.allLoaded = final;
    }

    mergeTokenStores (target, source) {
        for (const key in source) {
            if (!source.hasOwnProperty(key))
                continue;
            if (!target[key])
                target[key] = source[key];
            else if (Utils.isPlainObj(target[key]))
                target[key] = this.mergeTokenStores(target[key], source[key]);
            else if (Utils.isSetObj(target[key]))
                target[key] = Utils.mergeSets(target[key], source[key]);
            else
                target[key] = source[key];
        }

        return target;
    }

    updateQuery (query) {
        this.searchedDocs = new Set();
        query = stemming(query);
        const searched = this.search(query);

        if (!this.allLoaded)
            setTimeout(() => {
                this.updateQuery(query);
            }, 500);
        else
            return this.documents.filter(doc => searched.has(doc.id));
    }

    search (query) {
        for (const searchToken of query.split(this.options.separator)) {
            const letterObj = this.getLetter(searchToken);

            for (const letter in letterObj) {
                if (!letterObj.hasOwnProperty(letter))
                    continue;

                if (letter === 'docs')
                    this.searchedDocs = Utils.mergeSets(this.searchedDocs, letterObj[letter]);
                else
                    this.search(query + letter);
            }
        }

        return this.searchedDocs;
    }

    getLetter (token) {
        let obj = this.tokenStore;

        for (const letter of token) {
            if (!obj[letter])
                return {};

            obj = obj[letter];
        }

        return obj;
    }
}
