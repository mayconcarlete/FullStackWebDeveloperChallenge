import { IGetThreeWords } from '@domain/search-engine/usecases/get-three-similar-words'
import { TCalculatedSimilarity } from '../models/calculated-similarity'
import { ICalculateSimilarity } from '../protocols/calculate-similarity'
import { IGetWordsFromRepository } from '../protocols/get-three-words'

export class DbGetThreeWords implements IGetThreeWords{
    private calculatedSimilarity: TCalculatedSimilarity[] = []
    private threeClosestsWords: string[] = []
    constructor(
        private readonly similarityCalculator:ICalculateSimilarity,
        private readonly wordsFromRepository: IGetWordsFromRepository
    ){}
    async getThreeWords(word: string): Promise<string[]> {
        const wordsFromRepository = await this.wordsFromRepository.getWords()
        this.calculateSimilarityForAllWords(wordsFromRepository, word)
        let counterSimilarity = 1
        for(let i = 0; i < wordsFromRepository.length; i++){
            if(this.calculatedSimilarity[i].similarity == counterSimilarity) this.threeClosestsWords.push(this.calculatedSimilarity[i].name) 
            if(this.calculatedSimilarity.length == 3) break
        }
        return this.threeClosestsWords
    }

    private calculateSimilarityForAllWords(wordsFromRepository: string[], word: string) {
        wordsFromRepository.forEach((wordToCompare, index) => {
            this.calculatedSimilarity[index].name = wordToCompare
            this.calculatedSimilarity[index].similarity = this.similarityCalculator.calculateSimilarity(word, wordToCompare)
        })
    }


}