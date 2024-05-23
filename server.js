import express from 'express';
import fetch from 'node-fetch';
import csv from 'csv-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(express.static(join(__dirname, 'public')));

app.get('/', (req, res) => {
    // Menangani permintaan untuk root path dengan merespons file HTML index.html
    res.sendFile(join(__dirname, 'public', 'index.html'));
});

app.get('/data', async (req, res) => {
    try {
        const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vR1fPjKHDq7yo0m4s8O9XAN3p29BHMm-hgpah0PT2tIOi7R-YwCgDIEye22Uml_Z5vuZ4l2qU0ZgEB2/pub?output=csv');
        const rows = [];
        response.body
            .pipe(csv())
            .on('data', (row) => {
                rows.push(row);
            })
            .on('end', () => {
                console.log('Data:', rows); // Tambahkan ini untuk mencetak keluaran data
                res.json(rows);
            });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});


app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
