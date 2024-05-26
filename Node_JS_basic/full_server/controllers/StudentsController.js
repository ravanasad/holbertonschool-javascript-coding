import readDatabase from '../utils';

const fs = require('fs');

const dbPath = process.argv[2];

class StudentsController {
  static getAllStudents(req, res) {
    if (fs.existsSync(dbPath)) {
      readDatabase(dbPath)
        .then((data) => {
          const info = [];

          info.push('This is the list of our students');

          for (const field in data) {
            if (field) {
              info.push(`Number os students in ${field}: ${data[field].length}.  List: ${data[field].join(', ')}`);
            }
          }
          res.setHeader('Content-Type', 'text/plain');
          res.status(200).send(`${info.join('\n')}`);
        })
        .catch((err) => {
          res.setHeader('Content-Type', 'text/plain');
          res.status(500).send(err.message);
        });
    } else {
      res.setHeader('Content-Type', 'text/plain');
      res.status(200).send('Cannot load the database');
    }
  }

  static getAllStudentsByMajor(req, res) {
    const majors = ['CS', 'SWE'];
    if (majors.includes(req.params.major)) {
      if (fs.existsSync(dbPath)) {
        readDatabase(dbPath)
          .then((data) => {
            const students = data[req.params.major].join(', ');
            res.setHeader('Content-Type', 'text/plain');
            res.status(200).send(`List: ${students}`);
          });
      } else {
        res.setHeader('Content-Type', 'text/plain');
        res.status(500).send('Cannot load the database');
      }
    } else {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.send('Major parameter must be CS or SWE');
    }
  }
}

module.exports = StudentsController;
