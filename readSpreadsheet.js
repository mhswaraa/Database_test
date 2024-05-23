import fetch from 'node-fetch';
import csv from 'csvtojson';

const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR1fPjKHDq7yo0m4s8O9XAN3p29BHMm-hgpah0PT2tIOi7R-YwCgDIEye22Uml_Z5vuZ4l2qU0ZgEB2/pub?output=csv';

async function readData() {
    try {
        console.log("Fetching data from URL...");
        const response = await fetch(url);
        const csvData = await response.text();
        console.log("CSV Data:\n", csvData);  // Log the CSV data to check its content

        const jsonData = await csv().fromString(csvData);
        console.log("Data fetched and converted successfully:\n", jsonData);
    } catch (error) {
        console.error('Error reading data:', error);
    }
}

readData();
