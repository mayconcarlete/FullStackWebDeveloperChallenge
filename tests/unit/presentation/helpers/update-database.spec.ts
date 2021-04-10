import { InsertDatabase } from "@presentation/helpers/insert-database"
import { IUpdateDabase } from "@presentation/protocols"

type SutTypes = {
    sut: IUpdateDabase
}

const makeSut = ():SutTypes => {
    const sut = new InsertDatabase()
    return {sut}
}

describe('Insert Database class', () => {
    test('Should return an updated word when insert in database', async () => {
        const {sut} = makeSut()
        const wordToUpdate = 'valid_word'
        const resultOfInsert = await sut.insert(wordToUpdate)
        expect(resultOfInsert).toBeTruthy()
    })
})