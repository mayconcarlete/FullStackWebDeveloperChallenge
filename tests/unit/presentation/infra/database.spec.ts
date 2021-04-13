import {Database} from '@infra/database'

type SutTypes = {
    sut: Database
}

const makeSut = ():SutTypes => {
    const database:string[] = []
    const sut = Database.getInstance(database)
    return { sut }
}

describe('Database class', () => {
    test('Should return true when word is added in database', async () => {
        const {sut} = makeSut()
        const word = "valid_word"
        const addedWordResult = await sut.create(word)
        expect(addedWordResult).toBe(true)
    })

    test('Should return false when word already exists in Database', async () => {
        const { sut } = makeSut()
        const word = "valid_word"
        await sut.create(word)
        const resultOfInsert = await sut.create(word)
        expect(resultOfInsert).toBeFalsy()
    })

    test('Should return true when word is deleted in database', async () => {
        const {sut} = makeSut()
        const wordToDelete = 'valid_word'
        await sut.create(wordToDelete)
        const resultOfDelete = await sut.delete(wordToDelete)
        expect(resultOfDelete).toBeTruthy()
    })

    test('Should return false when word to delete does not exsits in database', async() => {
        const {sut} = makeSut()
        const wordToDelete = 'invalid_word'
        const resultOfDelete = await sut.delete(wordToDelete)
        expect(resultOfDelete).toBeFalsy()
    })
})