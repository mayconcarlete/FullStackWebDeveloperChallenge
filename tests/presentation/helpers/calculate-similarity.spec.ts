import { ISimilarity } from "@presentation/protocols/similarity"
import { CalculateSimilarity } from "@presentation/helpers/calculate-similarity"
import { MockDatabase } from "../mocks/mock-database"

type SutTypes = {
    sut:ISimilarity,
    mockDatabase: MockDatabase
}

const makeSut = ():SutTypes => {
    const databaseSpy = new MockDatabase() 
    const sut = new CalculateSimilarity(databaseSpy)
    return {
        sut,
        mockDatabase:databaseSpy
    }
}

describe('Calculate Similarity class', () => {
    test('Should call calculateSimilarity with correct values', async () => {
        const {sut} = makeSut()
        const word = 'papa'
        const calculateSimilaritySpy = jest.spyOn(sut, 'calculateSimilarity')
        sut.calculateSimilarity(word)
        expect(calculateSimilaritySpy).toHaveBeenCalledWith(word)
    })

    test('Should return the array when array length is less than 3', async () => {
        const {sut, mockDatabase} = makeSut()
        const wordsInDb = ['any_value', 'any_value_2']
        mockDatabase.wordsInDb = wordsInDb
        const word = 'any_word'
        const closestsWords = await sut.calculateSimilarity(word)
        expect(closestsWords).toEqual(wordsInDb)
    })

    test('Should return the closests 3 words with given array', async () => {
        const {sut, mockDatabase} = makeSut()
        const wordsInDb = ['baba', 'caca', 'zaza', 'any_value', 'foo']
        mockDatabase.wordsInDb = wordsInDb
        const word = 'sasa'
        const closestsWords = await  sut.calculateSimilarity(word)
        expect(closestsWords).toEqual(['baba', 'caca', 'zazaass'])
    })
})