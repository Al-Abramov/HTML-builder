const path = require('path');
const fs = require('fs');
const process = require('process');


const stdout = process.stdout;
const stdin = process.stdin;

const filePath = path.join(__dirname, 'text.txt');

fs.open(filePath, 'w', err => {
  if(err) {
    throw err;
  }
});

  stdin.on('data', (data) => {
    if(data.toString().trim().toLowerCase() === 'exit') {
      stdout.write('Good luck');
      process.exit();
    }

    stdout.write(`Hi ${data.toString()}`);
   
    fs.appendFile(filePath, data.toString(), err => {
      if(err) {
        throw err
      }
    })
  });


stdout.write('What is your name?');

process.on('SIGINT', () => {
  stdout.write('Good luck');
  process.exit();
});
