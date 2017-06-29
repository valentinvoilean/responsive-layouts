// Create a Browsersync instance
const bs = require('browser-sync').create();
const moduleImporter = require('sass-module-importer');
const sass = require('node-sass');
const fs = require('fs');

const buildSass = require('./buildSass');

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