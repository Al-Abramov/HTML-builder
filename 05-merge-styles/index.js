const path = require('path');
const fs = require('fs');

const styleFolderPath = path.join(__dirname, 'styles');
const bundlePath = path.join(path.join(__dirname, 'project-dist'), 'bundle.css');

let arr = [];

fs.readdir(styleFolderPath, { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  
  files.forEach(el => {
    let filePath = path.join(styleFolderPath, el.name);
    let parse = path.parse(filePath);
    
    if(el.isFile() && parse.ext === '.css') {
      fs.readFile(filePath, 'utf-8', (err, data) => {
        arr.push(data.toString());

         fs.writeFile(bundlePath, arr.join(''), err => {
           if (err) throw err;
         })
      })
      
    }
    
  })

});
