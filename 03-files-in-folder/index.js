const fs = require("fs");
const path = require("path");

const pathFolder = path.dirname(__filename) + '/secret-folder';

fs.readdir(pathFolder, { withFileTypes: true }, (err, files) => {
  if (err) {
    throw err;
  }

  files.forEach((el) => {
    console.log(el)
    if (el.isFile()) {
      let parse = path.parse(`${pathFolder}/${el.name}`);
    
      let nameFile = parse.name;
      let extensionFile = parse.ext.slice(1);

      fs.stat(`${pathFolder}/${el.name}`, (err, stats) => {
        if (err) {
          throw err;
        }
        let sizeFile = stats.size;
        console.log(`${nameFile} - ${extensionFile} - ${sizeFile} B`);
      });

    }

  });

});
