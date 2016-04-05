import { Component } from './component';

((root, factory) => {
    const SETUP_CONFIG = {
        INIT_CLASSNAME: 'e-search'
    };

    const SearchComponent = factory({});

    root.SearchComponent = SearchComponent;
    console.log(window.SearchComponent);

    SearchComponent.Component.autoInit(SETUP_CONFIG.INIT_CLASSNAME);
})(window, SearchComponent => {
    SearchComponent.VERSION = '0.0.1';

    SearchComponent.Component = Component;

    return SearchComponent;
});


const search = new SearchComponent.Component(document.querySelector('.example1'), {
    api: [
        {
            url: 'http://api-mockapitron.rhcloud.com/?size=5&name=name&address=address',
            transform: 'name=>title;address=>text',
            tpl: `
                <h2>{{title}}</h2>
                <hr />
                <b style="color: cadetblue;">{{text}}</b>
            `
        },
        {
            url: 'http://api-mockapitron.rhcloud.com/?size=5&name=name&address=address',
            transform: 'name=>title;address=>text',
            tpl: 'titleText'
        }
    ]
});
