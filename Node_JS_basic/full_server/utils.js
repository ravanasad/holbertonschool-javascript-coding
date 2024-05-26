const fs = require('fs');

function readDatabase(filePath) {
  return new Promise((res, rej) => {
    if (fs.existsSync(filePath)) {
      fs.readFile(filePath, (err, data) => {
        if (err) rej(err);
        else {
          const studentsByMajor = {};

          let students = data.toString().split('\n').map((elem) => elem.split(','));
          students = students.slice(1);

          const fields = {};

          students.forEach((student) => {
            fields[student[student.length - 1]] = (fields[student[student.length - 1]] || 0) + 1;
          });

          for (const field in fields) {
            if (field) {
              const result = students
                .filter((stud) => stud[stud.length - 1] === field)
                .map((element) => element[0]);
              studentsByMajor[field] = result;
            }
          }
          res(studentsByMajor);
        }
      });
    } else {
      throw new Error('Cannot load the database');
    }
  });
}

module.exports = readDatabase;
