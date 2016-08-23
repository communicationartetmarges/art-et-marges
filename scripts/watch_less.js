const compile = require('./compile_less'),
    path = require('path'),
    fs = require('fs');

const WATCH_PATH = path.resolve('./www/styles/less');

fs.watch(WATCH_PATH, (eventType, filename) => {
    if ('change' === eventType) {
        compile();
    }
});
