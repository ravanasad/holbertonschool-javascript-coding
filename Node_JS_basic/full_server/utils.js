const fs = require('fs');

function readDatabase(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(Error('Cannot load the database'));
      } else {
        const contents = data.trim().split('\n');
        const students = contents.map((content) => content.split(','));
        resolve(students);
      }
    });
  });
}
module.exports = readDatabase;
