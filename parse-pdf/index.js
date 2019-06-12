const fs = require('fs');
const prettier = require('prettier');
const pdf = require('pdf-parse');
const { format } = require('date-fns');
const axios = require('axios');
const assignIn = require('lodash/assignIn');

const dataBuffer = fs.readFileSync('./reading-plan.pdf');
const blackList = [
    'reading plan',
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec'
];
const axiosInstance = axios.create({
    baseURL: `https://api.esv.org/v3/passage/text/`,
    headers: {
        Authorization: 'Token cd6c85f89ca6fb3075cc9e79e953b17369785277'
    },
    params: {
        'include-passage-references': false,
        'include-footnotes': false,
        'include-footnote-body': false
    }
});

function writeFile(name, content) {
    fs.writeFile(name, content, err => {
        if (err) throw err;
        console.log(`\n\n${name} has been saved!\n\n`);
    });
}

function parseTextToArray(giantString) {
    return giantString
        .replace('\n\n', '\n')
        .split('\n')
        .slice(4)
        .filter(line => {
            const notBlackListed = blackList.indexOf(line) === -1;
            const parsedLine = line.split(' ');
            const hasContent = parsedLine.length > 1 && line !== '';

            return notBlackListed && hasContent;
        });
}

function chunk(array, size) {
    const chunkedArr = [];
    let index = 0;
    while (index < array.length) {
        chunkedArr.push(array.slice(index, index + size));
        index += size;
    }
    return chunkedArr;
}

async function init() {
    const pdfData = await pdf(dataBuffer);

    const textArr = parseTextToArray(pdfData.text);

    const groupedScripture = chunk(textArr, 4);
    let plan = {};

    let index = 1;

    for (const group of groupedScripture) {
        const date = format(new Date(2019, 0, index), 'MM-DD-YYYY');
        plan[date] = group;

        index++;
    }

    const stringifiedPlan = JSON.stringify(plan);
    const prettyJson = prettier.format(stringifiedPlan, {
        parser: 'json',
        tabWidth: 4
    });

    writeFile('reap-plan.json', prettyJson);
}

init();
