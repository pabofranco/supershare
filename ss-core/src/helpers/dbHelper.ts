import { createPool, Pool } from 'mysql';
import { database } from '../config/Settings.json';
var pool: Pool;

export const getPool = (): Pool => {
  if (pool) {
    return pool;
  }

  pool = createPool(database.connection);
  return pool;
};