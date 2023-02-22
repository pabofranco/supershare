import { createPool, Pool, PoolConfig } from 'mysql';
import { database } from "../config/Settings.json";

class Database {
    private poolConnection: Pool;

    constructor() {
        const options: PoolConfig = {
            ...database.connection,
            multipleStatements: true,

        };

        this.poolConnection = createPool(options);
    }

    public pool(): Pool { return this.poolConnection; }
}

export default new Database();
