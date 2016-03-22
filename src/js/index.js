import crossbrowser from './common/crossbrowser';
import { Service } from './service';
import { Component } from './component';
import Ajax from './common/ajax';


((root, factory) => {
    crossbrowser();
    var promise = new Ajax();
    const SETUP_CONFIG = {
        INIT_CLASSNAME: 'e-search'
    };

    promise.get('http://api-mockapitron.rhcloud.com/?size=3&name=name&address=address').then(response => {
        console.log(response);
    });

    const SearchEngine = factory({});

    root.SearchEngine = SearchEngine;

    SearchEngine.Component.autoInit(SETUP_CONFIG.INIT_CLASSNAME);
})(window, SearchEngine => {
    SearchEngine.VERSION = '0.0.1';

    SearchEngine.Service = Service;
    SearchEngine.Component = Component;

    return SearchEngine;
});
