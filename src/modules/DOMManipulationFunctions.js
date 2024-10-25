function $(el){
    return document.querySelector(el);
};

function $$(el){
    return document.querySelectorAll(el);
};

function c$(el, cls = "", id = ""){
    let elem = document.createElement(el);
    elem.classList.add(cls);
    elem.id = id;
    return elem;
};   

function createImage(cls, src){
    let img = c$("img", cls);
    img.src = src;
    return img;
};

export { $, $$, c$, createImage };