/**
 *
 *
 */

(function generate_image_blocks() {
    'use strict';

    var IMG_URL_PREFIX = '/medias/images/';
    var IMG_URL_SUFFIX = '.jpg';
    var GIF_URL_SUFFIX = '.gif';
    var IMG_ATTRIBUTE = 'image';
    var GIF_ATTRIBUTE = 'gif';

    if (window.location.protocol === 'file:') {
        IMG_URL_PREFIX = '../medias/images/';
    }

    function selector(attr) {
        return '[' + 'data-' + attr + ']';
    }

    function img_url(name, attr) {
        if (attr == IMG_ATTRIBUTE) {
            return ['url("', IMG_URL_PREFIX, name, IMG_URL_SUFFIX, '")'].join('');
        } else if (attr == GIF_ATTRIBUTE) {
            return ['url("', IMG_URL_PREFIX, name, GIF_URL_SUFFIX, '")'].join('');
        }
    }

    function css_rule(url) {
        return ['background-image:', url, ';'].join('');
    }

    var id_base = 0;
    function id_gen() {
        id_base += 1;
        return 'img_' + id_base;
    }

    function generate_block(elem, attr) {
        var id = id_gen();
        var s = 'data-' + attr;
        var url = img_url(elem.getAttribute(s), attr);
        var css_decl = ['#', id, '{', css_rule(url), '}'].join('');
        elem.id = id;

        return css_decl;
    }

    function generate_style() {
        var elementList = document.querySelectorAll(selector(IMG_ATTRIBUTE));
        var attr = IMG_ATTRIBUTE;
        if (elementList.length < 1) {
            elementList = document.querySelectorAll(selector(GIF_ATTRIBUTE));
            attr = GIF_ATTRIBUTE;
        }
        var style = [];
        for (var i = 0; i < elementList.length; i++) {
            style.push(generate_block(elementList[i], attr));
        }

        return style.join('\n');
    }

    function write_style() {
        var style_decl = document.createTextNode(generate_style());
        var style_elem = document.createElement('style');
        var head = document.querySelector('head');
        style_elem.type = 'text/css';
        style_elem.appendChild(style_decl);
        head.appendChild(style_elem);
    };

    write_style();

})();
