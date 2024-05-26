import fs from 'fs';
import { promisify } from 'util';
import csv from 'csv-parser';

const readFile = promisify(fs.readFile);

export async function readDatabase(filePath) {
    try {
        const data = await readFile(filePath, 'utf8');
        const lines = data.trim().split('\n');
        const students = {};

        lines.forEach(line => {
            const [firstname, field] = line.split(',');
            if (!students[field]) {
                students[field] = [];
            }
            students[field].push(firstname);
        });

        return students;
    } catch (error) {
        throw new Error('Cannot load the database');
    }
}
