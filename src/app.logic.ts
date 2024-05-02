import fs from 'fs';
import { yarg } from './config/plugins/args.plugin';

// grabar en el archivo de salida
// path: outputs/tabla-5.txt

const generateTitle = (base: number): string => {
    let result = '';
    const title = `${base} times table`;
    const width = 20;
    result += `${'='.repeat(width)}\n`;
    result += `${' '.repeat((width - title.length) / 2) + title}\n`;
    result += `${'='.repeat(width)}\n`;
    return result;
}

const saveOutput = (base: number, output: string) => {
    const folder = './outputs';
    const fileName = `${base}-table.txt`;
    const fullPath = folder + '/' + fileName;

    fs.mkdirSync(folder, { recursive: true });
    fs.writeFileSync(fullPath, output);
    console.log('File created!');
}

const generateTable = (base: number, limit: number, show: boolean): void => {
    let outputMessage: string = '';
    outputMessage += generateTitle(base);
    for (let i = 0; i < limit; i++) {
        outputMessage += `${base} x ${i + 1} = ${base * (i + 1)}\n`;
    }

    if (show) console.log(outputMessage);
    saveOutput(base, outputMessage);
}

const { b: base, l: limit, s: show } = yarg;
generateTable(base, limit, show);