/**
 * Created by Dmytro.Verbovyi on 17.03.2016.
 */
"use strict";
import { Service } from 'service'
import { Component } from 'component';

((root, factory) => {
    const SETUP_CONFIG = {
        INIT_CLASSNAME: 'e-autocomplete'
    };

    let SearchEngine = factory({});

    root.SearchEngine = SearchEngine;

    SearchEngine.Component.autoInit(SETUP_CONFIG.INIT_CLASSNAME);

})(window, (SearchEngine) => {
    SearchEngine.VERSION = '0.0.1';

    SearchEngine.Service = Service;
    SearchEngine.Component = Component;

    return SearchEngine;
});