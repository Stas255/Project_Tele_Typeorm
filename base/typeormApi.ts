import path from 'node:path';
import { DataSource } from 'typeorm';
import { MyCustomLogger } from '../logger';

export abstract class TypeormApi {
    protected connection: DataSource;

    constructor(dbName: string , entities: [any]) {
        if(!process.env.DB_PATH){
            throw new Error('DB_PATH environment variable not set');
        }
        this.connection = new DataSource({
            type: 'sqlite',
            database: path.join(process.cwd(), process.env.DB_PATH, dbName),
            entities: entities[0],
            logging: 'all',
            synchronize: true,
            logger: new MyCustomLogger(),
        });
    }

    async connect() {
        try {
            await this.connection.initialize();
            console.log('Connected to SQLite database');
        } catch (error) {
            console.error('Error connecting to SQLite database:', error);
        }
    }

    async disconnect() {
        try {
            await this.connection.destroy();
            console.log('Disconnected from SQLite database');
        } catch (error) {
            console.error('Error disconnecting from SQLite database:', error);
        }
    }
}