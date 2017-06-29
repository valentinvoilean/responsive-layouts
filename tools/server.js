const fs = require('fs');
const sass = require('node-sass');
const moduleImporter = require('sass-module-importer');
const bs = require('browser-sync').create();

const buildSass = require('./build');

bs.watch('src/*.scss', (event, file) => {
  if (event === 'change') {
    buildSass(file);
  }
});

bs.watch('public/**/*.css').on('change', bs.reload);
bs.watch('public/**/*.html').on('change', bs.reload);

bs.init({
  server: {
    baseDir: 'src',
    routes: {
      '/css': 'public/css',
      '/node_modules': 'node_modules'
    }
  }
});
