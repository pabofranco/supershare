import { IqueryResult } from "./IqueryResult";

export interface IdataController<T> {
    insert(data: T): Promise<IqueryResult>,
    remove(data: T): Promise<IqueryResult>,
    update(data: T): Promise<IqueryResult>,
    list(): Promise<IqueryResult>,
}
