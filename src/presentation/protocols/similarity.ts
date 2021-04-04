export interface ISimilarity {
    calculateSimilarity(word:string):Promise<string[]>
}