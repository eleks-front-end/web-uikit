import { Component } from './component';
import SearchAgent from './search-agent/index';
import TemplateAgent from './template-agent/index';
import LayoutAgent from './layout-agent/index';

((root, Component) => {
    const SETUP_CONFIG = {
        INIT_CLASSNAME: 'e-search'
    };

    Component.VERSION = "0.1";
    Component.autoInit(SETUP_CONFIG.INIT_CLASSNAME);

    root.SearchComponent = Component;
})(window, Component);


const search1 = new SearchComponent(document.querySelector('.example1'), {
    api: [
        {
            searchAgent: new SearchAgent('searchByUrl', {
                url: 'http://api-mockapitron.rhcloud.com/?size=5&name=name&address=address',
            }),
            templateAgent: new TemplateAgent('imageText', {
                transformer: 'name=>title;address=>text'
            })
        }
    ],
    loadMore: {
        text: 'Load More Please2'
    },
    layout: new LayoutAgent('multiColumn', {
        columnCount: 3,
        columnGap: 40,
        columnRule: '1px solid red'
    })

    // pagination: {
    //     perPage: 2,
    //     position: 'both'
    // }
});

const search2 = new SearchComponent(document.querySelector('.example2'), {
    api: [
        {
            searchAgent: new SearchAgent('searchByUrl', {
                url: 'http://api-mockapitron.rhcloud.com/?size=5&name=name&address=address',
            }),
            templateAgent: new TemplateAgent('imageText', {
                transformer: 'name=>title;address=>text'
            })
        }
    ],
    width: 600,
    loadMore: {
        text: 'Load More Please'
    }

    // pagination: {
    //     perPage: 2,
    //     position: 'both'
    // }
});
