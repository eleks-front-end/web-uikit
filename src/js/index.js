import { Component } from './component';

((root, Component) => {
    const SETUP_CONFIG = {
        INIT_CLASSNAME: 'e-search'
    };

    Component.VERSION = "0.1";
    Component.autoInit(SETUP_CONFIG.INIT_CLASSNAME);

    root.SearchComponent = Component;
})(window, Component);


const search = new SearchComponent(document.querySelector('.example1'), {
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
