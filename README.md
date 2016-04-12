web-uikit
=========

Web uikit for eleks projects

### [Demo page](http://eleks-front-end.github.io/web-uikit/)

### For development:

1.  `npm install`

2.  `gulp run`

### Usage

#### Autoinitialize

-   Without options

    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    <input type="text" class="e-search">
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-   With options

    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // options in camelCase style defining via _, for example: maxHeight should be written data-search-max_height="..."
    <input type="text" 
       class="e-search"
       data-search-api-url="http://api-mockapitron.rhcloud.com/?size=3&name=name&address=address"
       data-search-append_to=".container">
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#### Manual

-   Without options

    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const search = new SearchComponent(document.querySelector('.example1'));
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-   With options

    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const search = new SearchComponent(document.querySelector('.example1'), {
      api: {
    url: 'http://api-mockapitron.rhcloud.com/?size=3&name=name&address=address'
      },
      appendTo: '.container'
    });
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

### List of options

| Name           | Description                                                    | Type                    | Default     | Value                                                                                                                                           |
|----------------|----------------------------------------------------------------|-------------------------|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| searchType     | where would be search process on server  or on client side.    | **string**              | ‘client’    | *‘server’* or *‘client’*                                                                                                                        |
| defaultTpl     | default template                                               | **string**              | ‘plainText’ | one of the predefined templates(’imageText’, ‘plainText’, ‘titleText’), selector for script tag with template layout or string template layout; |
| appendTo       | tag where should appended results element                      | **node**                | body        | any block element                                                                                                                               |
| keywordName    | name of request url search param                               | **string**              | \-          | \-                                                                                                                                              |
| width          | width of search results element                                | **string**              | ‘auto’      | any css compatible values(’auto’=search input element width)                                                                                    |
| maxHeight      | maximal height of search results element                       | **number**              | 300         | any positive number                                                                                                                             |
| zIndex         | z-index of search results element                              | **number**              | 9999        | any number                                                                                                                                      |
| resultPosition | position of search results element, relatively to search input | **string**              | ‘auto’      | ‘auto’, ‘top’, ‘bottom’, ‘left’, ‘right’                                                                                                        |
| isAbsolute     | is search results element absolute positioning or relative     | **boolean**             | true        | true or false                                                                                                                                   |
| api            | api options or set of apis options                             | **array** or **object** | \-          | one or few sets api options                                                                                                                     |
| api.url        | http request url                                               | **string**              | \-          |                                                                                                                                                 |
| api.transform  | mapping response properties according to template properties   | **string**              | \-          |                                                                                                                                                 |
| api.tpl        | template which should be rendered our response                 | **string**              | defaultTpl  |                                                                                                                                                 |
