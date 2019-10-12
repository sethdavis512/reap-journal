const fs = require('fs');
const prettier = require('prettier');
const pdf = require('pdf-parse');
const { format } = require('date-fns');

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

function writeFile(name, content) {
    fs.writeFile(name, content, err => {
        if (err) throw err;
        console.log(`\n\n${name} has been saved!\n\n`);
    });
}

function parseTextToArray(giantString) {
    return giantString
        .replace('\n\n', '\n')
        .replace('112–113', 'Ps 112–113')
        .split('\n')
        .slice(4)
        .filter(line => {
            const trimmedLine = line.trim();
            const notBlackListed = blackList.indexOf(trimmedLine) === -1;

            const noSpace = [
                'Gen30',
                'Luke22',
                'Est7',
                'Ps114–115',
                'Ps107',
                'Ps150',
                '112–113'
            ];

            const parsedLine = trimmedLine.split(' ');
            const [firstElement] = parsedLine;
            const hasContent =
                (parsedLine.length > 1 || noSpace.indexOf(firstElement) > -1) &&
                trimmedLine;

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
    const plan = groupedScripture.reduce((acc, cur, index) => {
        const date = format(new Date(2019, 0, index + 1), 'MM-DD');
        if (index < 365) {
            acc[date] = cur.sort((a, b) => a > b);
        }
        return acc;
    }, {});
    const stringifiedPlan = JSON.stringify(plan);
    const prettyJson = prettier.format(stringifiedPlan, {
        parser: 'json',
        tabWidth: 4
    });
    writeFile('reap-plan.json', prettyJson);
}

init();
