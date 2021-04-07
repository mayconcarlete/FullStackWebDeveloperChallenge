import { GetThreeWordsController } from '@presentation/controllers'
import { MissingParamError, TypeVerificationError } from '@presentation/errors'
import { CalculateSimilarity } from '@presentation/helpers'
import {IController} from '@presentation/protocols'
import { IValidate } from '@presentation/protocols/validate'
import { THttpRequest, THttpResponse } from '@presentation/types'
import { RequiredField, ValidatorComposite } from '@presentation/validators'
import { TypeVerification } from '@presentation/validators/type-verification'
import { MockCalculateSimilarity } from '../mocks/mock-calculate-similarity'
import {MockValidator} from '../mocks/mock-validatior'

type SutTypes = {
    sut: IController,
    validators: MockValidator,
    similarity: MockCalculateSimilarity
}

const makeSut = ():SutTypes => {
    const validatorSpy = new MockValidator()
    const database = []
    const similaritySpy = new MockCalculateSimilarity()
    const sut = new GetThreeWordsController(validatorSpy, similaritySpy)
    return {
        sut,
        validators: validatorSpy,
        similarity: similaritySpy
    }
}

describe('Get Three Words class', () => {
    test('Should call validators with correct params', async() => {
        const {sut, validators} = makeSut()
        const request:THttpRequest = {
            headers:'headers_values',
            params:'params_values',
            body:'body_value'
        }
        await sut.handle(request)
        expect(validators.input).toEqual(request.params)
    })
    test('Should return 400 if param is not provided', async () => {
        const {sut, validators} = makeSut()
        const request:THttpRequest = {}
        validators.error = new MissingParamError('word')
        const response = await sut.handle(request)
        expect(response.body).toEqual(new MissingParamError('word'))
        expect(response.statusCode).toBe(400)
    })
    test('Should return 400 if word provided are with wrong type', async () => {
        const {sut, validators} = makeSut()
        const request:THttpRequest = {params:{word:10}}
        validators.error =  new TypeVerificationError('word')
        const response = await sut.handle(request)
        expect(response.body).toEqual(new TypeVerificationError('word'))
        expect(response.statusCode).toBe(400)
    })
    test('Should return undefined if validation succeeds', async () => {
        const {sut, validators} = makeSut()
        const request:THttpRequest = {params:{word:'any_word'}}
        await sut.handle(request)
        expect(validators.error).toBeFalsy()
    })
    
})
