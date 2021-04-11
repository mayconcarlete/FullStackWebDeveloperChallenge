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
})