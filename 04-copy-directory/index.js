const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, 'files');
const fileCopyPath = path.join(__dirname, 'files-copy');

fs.mkdir(fileCopyPath, { recursive: true }, (err) => {
  if(err) throw err;
})

function copyDir() {
  fs.readdir(filePath, { withFileTypes: true }, (err, files) => {
    if (err) throw err;

    files.forEach((el) => {
      if (el.isFile()) {
        fs.copyFile(filePath + '/' + el.name, fileCopyPath + '/' + el.name, (err) => {
          if(err) throw err;
        })
      }
    });
  });
}

fs.readdir(fileCopyPath, (err, files) => {
  if(err) throw err;

  files.forEach(el => {
    fs.unlink(path.join(fileCopyPath, el), err => {
      if(err) throw err;
    })
  })
})

copyDir();

