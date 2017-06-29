const fs = require('fs');
const sass = require('node-sass');
const moduleImporter = require('sass-module-importer');
const bs = require('browser-sync').create();

const buildSass = require('./build');

bs.watch('src/*.scss', function (event, file) {
    if (event === 'change') {
        buildSass(file);
    }
});

// Listen to change events on HTML and reload
bs.watch('public/**/*.css').on('change', bs.reload);
bs.watch('public/**/*.html').on('change', bs.reload);

// Now init the Browsersync server
bs.init({
    server: {
        baseDir: 'src',
        routes: {
            '/css': 'public/css'
        }
    }
});