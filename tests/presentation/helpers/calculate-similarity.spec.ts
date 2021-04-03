import { ISimilarity } from "@presentation/protocols/similarity"
import { CalculateSimilarity } from "@presentation/helpers/calculate-similarity"

type SutTypes = {
    sut:ISimilarity
}

const makeSut = ():SutTypes => {
    const sut = new CalculateSimilarity()
    return {sut}
}

describe('Calculate Similarity class', () => {
    test('Should call calculateSimilarity with correct values', () => {
        const {sut} = makeSut()
        const word = 'papa'
        const wordsInDb = ['abelha', 'baba']
        const calculateSimilaritySpy = jest.spyOn(sut, 'calculateSimilarity')
        sut.calculateSimilarity(word, wordsInDb)
        expect(calculateSimilaritySpy).toHaveBeenCalledWith(word, wordsInDb)
    })
})