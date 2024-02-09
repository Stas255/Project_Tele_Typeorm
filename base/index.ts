import { TypeormApi } from "./typeormApi";
import { EntitySchema, MixedList } from "typeorm";

export abstract class TypeormBase extends TypeormApi {
    constructor(dbName: string, entities: [any]) {
        super(dbName, entities);
    }

    async connect() {
        await super.connect();
    }

    async disconnect() {
        await super.disconnect();
    }
}