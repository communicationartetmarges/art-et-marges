
const less = require('less'),
    path = require('path'),
    fs = require('fs');


const SRC_PATH = path.resolve('./www/styles/less/styles.less');
const TARGET_PATH = path.resolve('./www/styles/styles.css');
const LESS_OPTIONS = {
    filename: SRC_PATH
};

function callback (fn) {
    return function (err, data) {
        if (err) {
            throw err;
        }
        fn(data);
    };
}

function error (err) {
    console.error(err);
}

function writeCSS (css) {
    fs.writeFile(TARGET_PATH, css, callback(data => {
        console.log('OK');
    }));
}


fs.readFile(SRC_PATH, callback(data => {
    less.render(data.toString('utf8'), LESS_OPTIONS)
        .then(out => {
            writeCSS(out.css);
        }, error);
    })
);
