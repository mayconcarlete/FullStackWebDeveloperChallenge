import { IUpdateDabase } from "@presentation/protocols";

export class MockUpdateDatabaseSpy implements IUpdateDabase{
    result:boolean = true
    word:string=''
    insert(word: string): Promise<boolean> {
        this.word = word
        return new Promise(resolve => resolve(this.result))
    }
}