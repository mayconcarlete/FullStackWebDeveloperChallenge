import { GetThreeWordsController } from '@presentation/controllers'
import { MissingParamError, TypeVerificationError } from '@presentation/errors'
import { IController } from '@presentation/protocols'
import { THttpRequest } from '@presentation/types'
import { MockCalculateSimilarity } from '../mocks/mock-calculate-similarity'
import { MockValidator } from '../mocks/mock-validatior'

type SutTypes = {
  sut: IController
  validators: MockValidator
  similarity: MockCalculateSimilarity
}

const makeSut = (): SutTypes => {
  const validatorSpy = new MockValidator()
  const similaritySpy = new MockCalculateSimilarity()
  const sut = new GetThreeWordsController(validatorSpy, similaritySpy)
  return {
    sut,
    validators: validatorSpy,
    similarity: similaritySpy
  }
}

describe('Get Three Words class', () => {
  test('Should call validators with correct params', async () => {
    const { sut, validators } = makeSut()
    const request: THttpRequest = {
      headers: 'headers_values',
      params: 'params_values',
      body: 'body_value'
    }

    await sut.handle(request)

    expect(validators.input).toEqual(request.params)
  })
  test('Should return 400 if param is not provided', async () => {
    const { sut, validators } = makeSut()
    const request: THttpRequest = {}
    validators.error = new MissingParamError('word')

    const response = await sut.handle(request)

    expect(response.body).toEqual(new MissingParamError('word'))
    expect(response.statusCode).toBe(400)
  })
  test('Should return 400 if word provided are with wrong type', async () => {
    const { sut, validators } = makeSut()
    const request: THttpRequest = { params: { word: 10 } }
    validators.error = new TypeVerificationError('word')

    const response = await sut.handle(request)

    expect(response.body).toEqual(new TypeVerificationError('word'))
    expect(response.statusCode).toBe(400)
  })
  test('Should call calculateSimilarity with correct params', async () => {
    const { sut, similarity } = makeSut()
    const calculateSimilaritySpy = jest.spyOn(similarity, 'calculateSimilarity')
    const request: THttpRequest = { params: { word: 'any_word' } }

    await sut.handle(request)

    expect(calculateSimilaritySpy).toHaveBeenCalledWith('ANY_WORD')
  })
  test('Should return 200 and an array with words on happy path', async () => {
    const { sut, similarity } = makeSut()
    const request: THttpRequest = { params: { word: 'any_word' } }
    similarity.closestsWords = ['a', 'b', 'c']

    const response = await sut.handle(request)

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(['a', 'b', 'c'])
  })
  test('Should throw if calculateSimlarity throws', async () => {
    const { sut, similarity } = makeSut()
    const request: THttpRequest = { params: { word: 'any_word' } }
    jest.spyOn(similarity, 'calculateSimilarity').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => {
        throw new Error('calculateSimilarity throws')
      })
    })

    const response = await sut.handle(request)

    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual(new Error('calculateSimilarity throws'))
  })
})
