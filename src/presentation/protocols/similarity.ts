export interface ISimilarity {
    calculateSimilarity(word:string, wordsInDb:string[]):string[]
}