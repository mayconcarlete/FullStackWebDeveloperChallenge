import {closest} from 'fastest-levenshtein'
import { ISimilarity } from "@presentation/protocols/similarity";
import { IDatabase } from '@presentation/protocols/database';


export class CalculateSimilarity implements ISimilarity{
    
    private closestsWords:string[] = []
    
    constructor(
        private readonly database: IDatabase
    ){}

    async calculateSimilarity(word:string):Promise<string[]> {
        const wordsInDb = await this.database.getDatabase()
        if(wordsInDb.length < 3) return wordsInDb
        this.getClosestsWords(word, wordsInDb);
        return this.closestsWords
    }

    private getClosestsWords(word: string, wordsInDb: string[]) {
        while (this.closestsWords.length < 3) {
            const closestWord: string = closest(word, wordsInDb);
            this.closestsWords.push(closestWord);
            wordsInDb.splice(wordsInDb.indexOf(closestWord), 1);
        }
    }
}