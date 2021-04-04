import { IDatabase } from "@presentation/protocols/database"


export class Database implements IDatabase {
    private static instance: Database
    
    private constructor(
        private database:string[]
    ){}
    
    public static getInstance(instanceConnection:string[]):Database {
        if(!Database.instance){
            Database.instance = new Database(instanceConnection)
        }
        return this.instance 
    }    
    async getDatabase():Promise<string[]> {
        return new Promise( resolve => resolve(this.database))
    }
}