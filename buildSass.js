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
    }, function(error, result) { // node-style callback from v3.0.0 onwards
        if (error) {
            console.log(error.status); // used to be "code" in v2x and below
            console.log(error.column);
            console.log(error.message);
            console.log(error.line);
        }
        else {
            fs.writeFile(output + fileName, result.css, function(error){
                if(error){
                    console.log(error.status);
                    console.log(error.message);
                } else {
                    console.log('SASS done');
                }
            });
        }
    });
}

module.exports = index;