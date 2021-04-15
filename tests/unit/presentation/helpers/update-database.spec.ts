import { InsertDatabase } from '@presentation/helpers/insert-database'
import { IUpdateDabase } from '@presentation/protocols'
import { MockDatabase } from '../mocks/mock-database'

type SutTypes = {
  sut: IUpdateDabase
  databaseSpy: MockDatabase
}

const makeSut = (): SutTypes => {
  const databaseSpy = new MockDatabase()
  const sut = new InsertDatabase(databaseSpy)
  return { sut, databaseSpy }
}

describe('Insert Database class', () => {
  test('Should return false when word already exists in db', async () => {
    const { sut, databaseSpy } = makeSut()
    const word = 'valid_word'
    databaseSpy.resultOfInsert = false
    const resultOfInsert = await sut.insert(word)
    expect(resultOfInsert).toBeFalsy()
  })

  test('Should throw when database throws', async () => {
    const { sut, databaseSpy } = makeSut()
    const word = 'valid_word'
    jest.spyOn(databaseSpy, 'create').mockImplementationOnce(async () => {
      return new Promise(() => {
        throw new Error('something wrong with server')
      })
    })
    await expect(sut.insert(word)).rejects.toThrow()
  })

  test('Should return an updated word when insert in database', async () => {
    const { sut } = makeSut()
    const wordToUpdate = 'valid_word'
    const resultOfInsert = await sut.insert(wordToUpdate)
    expect(resultOfInsert).toBeTruthy()
  })
})
