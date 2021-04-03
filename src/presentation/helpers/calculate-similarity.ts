import {distance, closest} from 'fastest-levenshtein'
import { ISimilarity } from "@presentation/protocols/similarity";


export class CalculateSimilarity implements ISimilarity{
    private closestsWords:string[] = []
    constructor(){}
    calculateSimilarity(word:string, wordsInDb: string[]):string[] {
        
        while(this.closestsWords.length < 3){
            const closestWord:string = closest(word, wordsInDb)
            this.closestsWords.push(closestWord)
            wordsInDb.splice(wordsInDb.indexOf(closestWord), 1)
        }
        return this.closestsWords
    }
}