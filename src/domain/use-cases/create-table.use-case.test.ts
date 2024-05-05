import { CreateTable } from './create-table.use-case';

describe('CreateTableUseCase', () => {

    test('should create table with default values', () => {
        const createTable = new CreateTable();
        expect(createTable).toBeInstanceOf(CreateTable);

        const table = createTable.execute({ base: 2 });
        expect(table).toContain('2 x 1 = 2');
        expect(table).toContain('2 x 12 = 24');

        const rows = table.split('\n').length;
        expect(rows).toBe(12);
    });

    test('should create table with custom values', () => {
        const options = {
            base: 3,
            limit: 20
        };

        const createTable = new CreateTable();
        const table = createTable.execute(options);
        const rows = table.split('\n').length;

        expect(table).toContain(`${options.base} x ${options.limit} = ${options.base * options.limit}`);
        expect(rows).toBe(options.limit);
    })
});