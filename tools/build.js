const sass = require('node-sass');
const moduleImporter = require('sass-module-importer');
const fs = require('fs');

const output = 'public/css/';

function index(file) {
  const fileName = file.match(/([^\/]+)(?=\.\w+$)/)[0] + '.css';

  sass.render({
    file: file,
    importer: moduleImporter(),
    outputStyle: 'expanded'
  }, (error, result) => {
    if (error) {
      console.log(error.status);
      console.log(error.column);
      console.log(error.message);
      console.log(error.line);
    }
    else {
      fs.writeFile(output + fileName, result.css, error => {
        if (error) {
          console.log(error.status);
          console.log(error.message);
        } else {
          console.log('Finished SASS compilation!');
        }
      });
    }
  });
}

module.exports = index;
