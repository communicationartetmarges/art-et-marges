/**
 *
 *
 */

(function generate_image_blocks () {
    'use strict';

    var IMG_URL_PREFIX = '/medias/images/';
    var IMG_URL_SUFFIX = '.jpg';
    var DATA_ATTRIBUTE = 'image';

    if (window.location.protocol === 'file:' ) {
        IMG_URL_PREFIX = '../medias/images/';
    }

    function attribute () {
        return 'data-' + DATA_ATTRIBUTE;
    }

    function selector () {
        return '[' + attribute() + ']';
    }

    function img_url (name) {
        return ['url("', IMG_URL_PREFIX, name, IMG_URL_SUFFIX, '")'].join('');
    }

    function css_rule (url) {
        return ['background-image:', url, ';'].join('');
    }

    var id_base = 0;
    function id_gen () {
        id_base += 1;
        return 'img_' + id_base;
    }

    function generate_block (elem) {
        var id = id_gen();
        var url = img_url(elem.getAttribute('data-image'));
        var css_decl = ['#', id, '{', css_rule(url) ,'}'].join('');
        elem.id = id;

        return css_decl;
    }

    function generate_style () {
        var elementList = document.querySelectorAll(selector());
        var style = [];
        for (var i = 0; i < elementList.length; i++) {
            style.push(generate_block(elementList[i]));
        }

        return style.join('\n');
    }

    function write_style () {
        var style_decl = document.createTextNode(generate_style());
        var style_elem = document.createElement('style');
        var head = document.querySelector('header');
        style_elem.type = 'text/css';
        style_elem.appendChild(style_decl);
        head.appendChild(style_elem);
    };

    write_style();

})();
