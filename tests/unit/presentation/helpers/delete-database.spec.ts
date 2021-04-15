import { DeleteDatabase } from '@presentation/helpers/delete-database'
import { MockDeleteWordDatabase } from '../mocks/mock-delete-database'

type SutTypes = {
  sut: DeleteDatabase
  mockDatabaseSpy: MockDeleteWordDatabase
}
const makeSut = (): SutTypes => {
  const mockDatabaseSpy = new MockDeleteWordDatabase()
  const sut = new DeleteDatabase(mockDatabaseSpy)
  return { sut, mockDatabaseSpy }
}

describe('Delete Database class', () => {
  test('Should call database delete with correct param', async () => {
    const { sut, mockDatabaseSpy } = makeSut()
    const wordToDelete = 'any_word'
    await sut.delete(wordToDelete)
    expect(mockDatabaseSpy.word).toBe(wordToDelete.toUpperCase())
  })

  test('Should return true when word is deleted', async () => {
    const { sut } = makeSut()
    const wordToDelete = 'Valid_word'
    const resultOfDelete = await sut.delete(wordToDelete)
    expect(resultOfDelete).toBeTruthy()
  })

  test('Should return false when word doesnt exists in database', async () => {
    const { sut, mockDatabaseSpy } = makeSut()
    const wordToDelete = 'invalid_word'
    mockDatabaseSpy.isDeleted = false
    const resultOfDelete = await sut.delete(wordToDelete)
    expect(resultOfDelete).toBeFalsy()
  })

  test('Should throw if database throws', async () => {
    const { sut, mockDatabaseSpy } = makeSut()
    const wordToDelete = 'any_word'
    jest.spyOn(mockDatabaseSpy, 'delete').mockImplementationOnce(async () => {
      return new Promise(() => {
        throw new Error()
      })
    })
    await expect(sut.delete(wordToDelete)).rejects.toThrow()
  })
})
