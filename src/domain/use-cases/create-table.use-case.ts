export interface CreateTableUseCase {
    execute: (options: CreateTableOptions) => string;
}

export interface CreateTableOptions {
    base: number;
    limit?: number;
}

export class CreateTable implements CreateTableUseCase {
    constructor(
        /**
         * DI - Dependency Injection
         */
    ) {

    }

    // execute, run, create
    execute({ base, limit = 12 }: CreateTableOptions): string {

        let outputMessage = '';
        for (let i = 0; i < limit; i++) {
            outputMessage += `${base} x ${i + 1} = ${base * (i + 1)}\n`;
        }

        return outputMessage;
    }
}