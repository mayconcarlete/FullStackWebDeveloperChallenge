import { UpdateWordController } from '@presentation/controllers'
import { AlreadyExistsInDb, MissingParamError } from '@presentation/errors'
import { IController } from '@presentation/protocols'
import { THttpRequest, THttpResponse } from '@presentation/types'
import { MockUpdateDatabaseSpy } from '../mocks/mock-insert-database'
import { MockValidator } from '../mocks/mock-validatior'

type SutTypes = {
  sut: IController
  validatorSpy: MockValidator
  updateDatabaseSpy: MockUpdateDatabaseSpy
}

const makeSut = (): SutTypes => {
  const validatorSpy = new MockValidator()
  const updateDatabaseSpy = new MockUpdateDatabaseSpy()
  const sut = new UpdateWordController(validatorSpy, updateDatabaseSpy)
  return { sut, validatorSpy, updateDatabaseSpy }
}

describe('Update Word Database class', () => {
  test('Should return 200 and word when a request succeeds', async () => {
    const { sut } = makeSut()
    const request: THttpRequest = {
      params: {
        word: 'valid_word'
      }
    }

    const response: THttpResponse = await sut.handle(request)

    expect(response.statusCode).toBe(200)
    expect(response.body).toBe(request.params.word)
  })

  test('Should return 400 when validation fails', async () => {
    const { sut, validatorSpy } = makeSut()
    validatorSpy.error = new MissingParamError('word')
    const request: THttpRequest = {
      params: {
        word: ''
      }
    }

    const response: THttpResponse = await sut.handle(request)

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(validatorSpy.error)
  })

  test('Should call insert with correct params', async () => {
    const { sut, updateDatabaseSpy } = makeSut()
    const request: THttpRequest = {
      params: {
        word: 'valid_word'
      }
    }

    await sut.handle(request)

    expect(updateDatabaseSpy.word).toBe(request.params.word)
  })

  test('Should return 400 if word could not be inserted', async () => {
    const { sut, updateDatabaseSpy } = makeSut()
    updateDatabaseSpy.result = false
    const request: THttpRequest = {
      params: {
        word: 'invalid_word'
      }
    }

    const response = await sut.handle(request)

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new AlreadyExistsInDb(request.params.word))
  })

  test('Should return 500 when insert database throws', async () => {
    const { sut, updateDatabaseSpy } = makeSut()
    jest.spyOn(updateDatabaseSpy, 'insert').mockImplementationOnce(async () => {
      return new Promise(() => {
        throw new Error()
      })
    })
    const request: THttpRequest = {
      params: {
        word: 'valid_word'
      }
    }

    const response = await sut.handle(request)

    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual(new Error())
  })
})
