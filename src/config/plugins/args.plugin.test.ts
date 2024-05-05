// import { yarg } from './args.plugin';

const runCommand = async (args: string[]) => {
    process.argv = [...process.argv, ...args];
    const { yarg } = await import('./args.plugin');
    return yarg;
}

describe('Test args.plugin.ts', () => {

    const originalArgv = process.argv;

    beforeEach(() => {
        process.argv = originalArgv;
        jest.resetModules();
    });

    test('should return default values', async () => {
        const argv = await runCommand(['-b', '5']);
        expect(argv).toEqual(expect.objectContaining({
            b: 5,
            l: 12,
            s: false,
            n: 'multiplication-table',
            d: 'outputs',
        }));
    });

    test('should return configuration with custom values', async () => {
        const base = 7,
            limit = 12,
            showTable = true,
            destinationName = 'table',
            destinationFolder = 'out';

        const argv = await runCommand([
            '-b', base.toString(), '-l', limit.toString(), '-s', '-n', destinationName, '-d', destinationFolder
        ]);

        console.log(argv);

        expect(argv).toEqual(expect.objectContaining({
            b: base,
            l: limit,
            s: showTable,
            n: destinationName,
            d: destinationFolder,
        }));
    });
});