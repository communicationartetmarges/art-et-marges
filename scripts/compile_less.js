
const less = require('less'),
    path = require('path'),
    fs = require('fs');
var LessPluginAutoPrefix = require('less-plugin-autoprefix'),
        autoprefixPlugin = new LessPluginAutoPrefix({browsers: ["last 2 versions"]});

const SRC_PATH = path.resolve('./www/styles/less/styles.less');
const TARGET_PATH = path.resolve('./www/styles/styles.css');
const LESS_OPTIONS = {
    filename: SRC_PATH,
    plugins: [autoprefixPlugin] 
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



function compile_less () {
    fs.readFile(SRC_PATH, callback(data => {
        less.render(data.toString('utf8'), LESS_OPTIONS)
            .then(out => {
                writeCSS(out.css);
            }, error);
        })
    );
}

module.exports = compile_less;

if (null === module.parent) {
    compile_less();
}
