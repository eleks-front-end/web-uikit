export default data => `
    <figure>
        <img src="${data.img.src}" alt="">
        ${ data.img.caption
            ? `<figcaption>${data.img.caption}</figcaption>`
            : ''
        }
    </figure>
    <p>${data.text}</p>`;
