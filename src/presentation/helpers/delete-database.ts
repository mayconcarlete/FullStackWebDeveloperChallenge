import { IDeleteDatabase } from "@presentation/protocols/delete-database";

export class DeleteDatabase implements IDeleteDatabase{
    constructor(
        private readonly database:IDeleteDatabase
    ){}
    async delete(word: string): Promise<boolean> {
        const wordUppercase = word.toUpperCase()
        console.log(wordUppercase)
        const deletedWord = await this.database.delete(wordUppercase)
        if(!deletedWord){
            return false
        }
        return true
    }
}