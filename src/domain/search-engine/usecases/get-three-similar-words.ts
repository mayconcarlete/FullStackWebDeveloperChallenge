export interface IGetThreeWords {
    getThreeWords(word:string):Promise<string[]>
}