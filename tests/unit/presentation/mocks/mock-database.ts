import { IDatabase } from "@presentation/protocols/database";

export class MockDatabase implements IDatabase{
    error: Error|undefined
    wordsInDb:string[] = []
    getDatabase(): Promise<string[]> {
        return new Promise(resolve => resolve(this.wordsInDb))
    }
}