import path from "node:path";
import { Logger, QueryRunner } from "typeorm"
import winston from "winston"

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ dirname: path.join(process.cwd(), process.env.DB_LOG_PATH || 'db_log'), filename: process.env.DB_LOG_PATH  || 'combined.log' }),
    ],
});

export class MyCustomLogger implements Logger {
    async logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): Promise<void> {
        this.log('info', { query, parameters });
    }

    logQueryError(error: string, query: string, parameters?: any[]): void {
        this.log('error', { error, query, parameters });
    }

    logQuerySlow(time: number, query: string, parameters?: any[]): void {
        this.log('warn', { time, query, parameters });
    }

    logSchemaBuild(message: string): void {
        this.log('info', message);
    }

    logMigration(message: string): void {
        this.log('info', message);
    }

    log(level: "log" | "info" | "warn" | "error", message: any): void {
        const date = new Date();
        logger.log(level, { message, timestamp: date.toISOString() });
    }
}