import { IDatabase } from "@presentation/protocols/database"
import { IDeleteDatabase } from "@presentation/protocols/delete-database"
import { IInsertDatabase } from "@presentation/protocols/insert-database"


export class Database implements IDatabase, IInsertDatabase, IDeleteDatabase {
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

    async create(word: string): Promise<boolean> {
        const resultOfInsert = this.database.includes(word)
        if(!resultOfInsert){
            this.database.push(word)
            return new Promise(resolve => resolve(true))
        }
        return new Promise(resolve => resolve(false))
    }
    async delete(word: string): Promise<boolean> {
        if(this.database.includes(word)){
            this.database.filter((value) => {
                return value !== word
            })
            return true
        }
        return false
    }
}