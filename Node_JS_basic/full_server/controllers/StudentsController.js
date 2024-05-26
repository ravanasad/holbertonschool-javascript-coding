import { readDatabase } from '../utils.js';

export default class StudentsController {
    static async getAllStudents(req, res) {
        const databaseFile = process.argv[2];
        try {
            const students = await readDatabase(databaseFile);
            let responseText = 'This is the list of our students\n';

            for (const field of Object.keys(students).sort()) {
                const count = students[field].length;
                const list = students[field].join(', ');
                responseText += `Number of students in ${field}: ${count}. List: ${list}\n`;
            }

            res.status(200).send(responseText.trim());
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async getAllStudentsByMajor(req, res) {
        const databaseFile = process.argv[2];
        const { major } = req.params;
        const validMajors = ['CS', 'SWE'];

        if (!validMajors.includes(major)) {
            res.status(500).send('Major parameter must be CS or SWE');
            return;
        }

        try {
            const students = await readDatabase(databaseFile);
            const list = students[major] ? students[major].join(', ') : '';
            res.status(200).send(`List: ${list}`);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}
