export interface ItableQuery<U, T = null> {
    list: { (arg?: T): Promise<U> },
    insert?: { (arg: T): Promise<U> },
    update?: { (arg: T): Promise<U> },
    remove?: { (arg: T): Promise<U> },
}
