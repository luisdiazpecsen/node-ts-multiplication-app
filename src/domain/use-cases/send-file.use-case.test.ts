import { SaveFile } from './save-file.use-case';
import fs from 'fs';

describe('SendFileUseCase', () => {

    let mainFolder = '';
    const customOptions = {
        fileContent: 'custom content',
        fileDestination: 'custom-outputs',
        fileName: 'custom-table-name',
    };

    beforeEach(() => {
        mainFolder = 'outputs';
        jest.clearAllMocks();
    });

    afterEach(() => {
        // clean up
        if (mainFolder != '') {
            const pathExists = fs.existsSync(mainFolder);
            if (pathExists) fs.rmSync(mainFolder, { recursive: true });
        }
    });

    test('should save file with default values', () => {
        mainFolder = 'outputs';
        const saveFile = new SaveFile();
        const filePath = `${mainFolder}/table.txt`;
        const options = {
            fileContent: 'test content',
        };

        const result = saveFile.execute(options);
        expect(result).toBeTruthy();

        const fileExists = fs.existsSync(filePath);
        expect(fileExists).toBeTruthy();

        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
        expect(fileContent).toBe(options.fileContent);
    });

    test('should save file with custom values', () => {
        mainFolder = customOptions.fileDestination;
        const saveFile = new SaveFile();
        const filePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;

        const result = saveFile.execute(customOptions);
        expect(result).toBeTruthy();

        const fileExists = fs.existsSync(filePath);
        expect(fileExists).toBeTruthy();

        const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });
        expect(fileContent).toBe(customOptions.fileContent);
    });

    test('should return false if directory could not be created', () => {
        mainFolder = customOptions.fileDestination;

        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
            throw new Error('This is a custom error message from testing');
        });

        const result = saveFile.execute(customOptions);
        expect(result).toBeFalsy();

        mkdirSpy.mockRestore();
    });

    test('should return false if file could not be created', () => {
        const saveFile = new SaveFile();
        const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {
            throw new Error('This is a custom error message from testing');
        });

        const result = saveFile.execute({ fileContent: 'Hola' });
        expect(result).toBeFalsy();

        writeFileSpy.mockRestore();
    });
});