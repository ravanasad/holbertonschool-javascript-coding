const readDatabase = require('../utils');

class StudentsController {
  static getAllStudents(req, res) {
    try {
      const students = readDatabase('database.csv');
      students.then((data) => {
        const fields = {};
        const printed = [];
        printed.push('This is the list of our students');
        printed.push(`Number of students: ${data.length - 1}`);
        data.forEach((student) => {
          const [firstname, , , field] = student;
          if (!fields[field]) {
            fields[field] = {
              count: 0,
              list: [],
            };
          }
          fields[field].count += 1;
          fields[field].list.push(firstname);
        });
        const f = [];
        for (const field in fields) {
          if (Object.prototype.hasOwnProperty.call(fields, field)) {
            f.push(field);
          }
        }
        f.shift();
        for (const field in f) {
          if (Object.prototype.hasOwnProperty.call(f, field)) {
            printed.push(`Number of students in ${f[field]}: ${fields[f[field]].list.length}. List: ${fields[f[field]].list.join(', ')}`);
          }
        }
        return res.send(printed.join('\n'));
      });
    } catch (error) {
      return res.status(500).send(error.message);
    }
    return (0);
  }

  static getAllStudentsByMajor(req, res) {
    try {
      const students = readDatabase('database.csv');
      students.then((data) => {
        const { major } = req.params;
        const fields = {};
        const printed = [];
        data.forEach((student) => {
          const [firstname, , , field] = student;
          if (!fields[field]) {
            fields[field] = {
              count: 0,
              list: [],
            };
          }
          fields[field].count += 1;
          fields[field].list.push(firstname);
        });
        const f = [];
        for (const field in fields) {
          if (Object.prototype.hasOwnProperty.call(fields, field)) {
            f.push(field);
          }
        }
        f.shift();
        switch (major) {
          case 'CS':
            printed.push(`List: ${fields.CS.list.join(', ')}`);
            res.send(printed.join('\n'));
            break;
          case 'SWE':
            printed.push(`List: ${fields.SWE.list.join(', ')}`);
            res.send(printed.join('\n'));
            break;
          default:
            return res.status(500).send('Major parameter must be CS or SWE');
        }
        return (0);
      });
    } catch (error) {
      return res.status(500).send(error.message);
    }
    return (0);
  }
}

module.exports = StudentsController;
