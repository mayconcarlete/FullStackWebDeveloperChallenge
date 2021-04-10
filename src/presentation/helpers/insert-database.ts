import { IUpdateDabase } from "@presentation/protocols";

export class InsertDatabase implements IUpdateDabase{
    async insert(word: string): Promise<boolean> {
        return new Promise(resolve => resolve(true))
    }
}