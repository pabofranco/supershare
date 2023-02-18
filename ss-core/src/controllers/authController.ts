import { getPool } from '../helpers/dbHelper';
import { IregisterParams } from '../interfaces/IregisterParams';

export const addUser = async (data: IregisterParams): Promise<void> => {
  const db = getPool();
};
