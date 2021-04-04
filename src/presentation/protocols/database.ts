export interface IDatabase {
    getDatabase():Promise<string[]>
}