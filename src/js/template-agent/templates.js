const imageText = data => `
    <figure>
        <img src="${data.img.src}" alt="">
        ${ data.img.caption
    ? `<figcaption>${data.img.caption}</figcaption>`
    : ''
    }
    </figure>
    <p>${data.text}</p>`;

const titleText = data => `
    <h3>${data.title}</h3>
    <p>${data.text}</p>`;

const plainText = data => `
    <p>${data.text}</p>`;

const custom = (data, tpl) => (tpl.replace(/{{(.+)}}/gmi, (match, p1) => (data[p1.toLowerCase()])));

const bySelector = (data, selector) => {
    const element = document.querySelector(selector);
    
    return custom(data, element.innerHTML);

};


export {imageText, titleText, plainText, custom, bySelector};
