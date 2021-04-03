import {distance, closest} from 'fastest-levenshtein'
import { ISimilarity } from "@presentation/protocols/similarity";


export class CalculateSimilarity implements ISimilarity{
    
    private closestsWords:string[] = []
    
    calculateSimilarity(word:string, wordsInDb: string[]):string[] {
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