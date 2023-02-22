export interface IqueryResult<T = string> {
    error?: boolean,
    data?: T | string,
}
