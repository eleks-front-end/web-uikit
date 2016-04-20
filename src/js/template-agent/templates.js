/**
 * Function for template with image, image caption & some text properties
 * @param {object} data
 * @returns {string} - templated string
 */
const imageText = data => `
    <figure>
        <img src="${data.img.src}" alt="">
        ${ data.img.caption
    ? `<figcaption>${data.img.caption}</figcaption>`
    : ''
    }
    </figure>
    <p>${data.text}</p>`;

/**
 * Function for template with title & some text properties
 * @param {object} data
 * @returns {string} - templated string
 */
const titleText = data => `
    <h3>${data.title}</h3>
    <p>${data.text}</p>`;

/**
 * Function for template with only text property
 * @param {object} data
 * @returns {string} - templated string
 */
const plainText = data => `
    <p>${data.text}</p>`;

/**
 * Function for custom template
 * @param {object} data
 * @param {string} tpl - string template with specific expressions in double curly braces
 * @returns {string} - templated string
 */
const custom = (data, tpl) => (tpl.replace(/{{(.+)}}/gmi, (match, p1) => (data[p1.toLowerCase()])));

/**
 * Function for custom template from script tag
 * @param {object} data
 * @param {string} selector - selector which represent script tag with template
 * @returns {string} - templated string
 */
const bySelector = (data, selector) => {
    const element = document.querySelector(selector);
    
    return custom(data, element.innerHTML);
};


export {imageText, titleText, plainText, custom, bySelector};
