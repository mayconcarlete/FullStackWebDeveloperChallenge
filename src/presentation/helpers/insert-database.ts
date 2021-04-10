import { IUpdateDabase } from "@presentation/protocols";
import { IInsertDatabase } from "@presentation/protocols/insert-database";

export class InsertDatabase implements IUpdateDabase{
    constructor(
        private readonly database: IInsertDatabase
    ){}
    async insert(word: string): Promise<boolean> {
        const resultOfInsert = await this.database.create(word)
        if(!resultOfInsert){
            return false
        }
        return true
    }
}