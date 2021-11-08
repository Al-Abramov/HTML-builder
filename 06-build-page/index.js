const path = require('path');
const fs = require('fs');
const fsPromises = fs.promises;


const projectFolderPath = path.join(__dirname, 'project-dist');
const projectIndexPath = path.join(projectFolderPath, 'index.html');
const projectStylePath = path.join(projectFolderPath, 'stye.css');
const tempPath = path.join(__dirname, 'template.html');

fs.mkdir(projectFolderPath, { recursive: true }, (err) => {
  if(err) throw err;
})

fs.readFile(tempPath, 'utf-8', (err, data) => {
  if(err) throw err;

  getComponentsObj().then((obj) => {
    let tempString = data.toString();

    Object.keys(obj).forEach((key) => {
      tempString = tempString.replace(`{{${key}}}`, obj[key]);
    })
    
    return tempString;
  }).then((str) => {
    fs.writeFile(projectIndexPath, str, err => {
      if(err) throw err
    })
  });

})


const componentsPath = path.join(__dirname, 'components');
let componentsObj = {};

async function getComponentsObj() {
  
  try {
    const files = await fsPromises.readdir(componentsPath);

    for(const file of files) {
      let filePath = path.join(componentsPath, file);
      let parse = path.parse(filePath);

      try {
        const data = await fsPromises.readFile(filePath, 'utf-8');

        componentsObj[parse.name] = data;
    
      } catch (err) {
        console.error(err);
      }

    }
      
    } catch (err) {
      console.log(err)
    }

   return componentsObj;
  }

//Create style

const stylesFolderPath = path.join(__dirname, 'styles');
const mainStylePath = path.join(path.join(__dirname, 'project-dist'), 'style.css');

let arr = [];

fs.readdir(stylesFolderPath, { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  
  files.forEach(el => {
    let filePath = path.join(stylesFolderPath, el.name);
    let parse = path.parse(filePath);

    if(el.isFile() && parse.ext === '.css') {
      fs.readFile(filePath, 'utf-8', (err, data) => {
        arr.push(data.toString());

         fs.writeFile(mainStylePath, arr.join(''), err => {
           if (err) throw err;
         })
      })
      
    }
    
  })

});

//Copy assets

const filePath = path.join(__dirname, 'assets');
const fileCopyPath = path.join(path.join(__dirname, 'project-dist'), 'assets');

fs.rm(fileCopyPath, { recursive: true }, () => {
  fs.mkdir(fileCopyPath, { recursive: true }, (err) => {
    if(err) throw err;
    copyDir(filePath);
  })
});


function copyDir(initialPath, folderName) {
  let filePath = initialPath;
 

  fs.readdir(filePath, { withFileTypes: true }, (err, files) => {
    if (err) throw err;

    files.forEach((el) => {
      if (el.isFile()) {
        fs.copyFile(filePath + '/' + el.name, fileCopyPath + `${folderName ? ('/' + folderName) : ''}` + '/' + el.name, (err) => {
          if(err) throw err;
        })
      } else {
        fs.mkdir(fileCopyPath + '/' + el.name, { recursive: true }, (err) => {
          if(err) throw err;
          
        })
        copyDir(filePath + '/' + el.name, el.name);
      }
      
    });

  });
}
