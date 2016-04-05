export default (data, tpl) => (tpl.replace(/{{(.+)}}/gmi, (match, p1) => (data[p1.toLowerCase()])));
