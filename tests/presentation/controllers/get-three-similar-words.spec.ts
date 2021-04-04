import { GetThreeWords } from '@presentation/controllers'
import { MissingParamError, TypeVerificationError } from '@presentation/errors'
import {IController} from '@presentation/protocols'
import { IValidate } from '@presentation/protocols/validate'
import { THttpRequest, THttpResponse } from '@presentation/types'
import { RequiredField, ValidatorComposite } from '@presentation/validators'
import { TypeVerification } from '@presentation/validators/type-verification'
import {MockValidator} from '../mocks/mock-validatior'

type SutTypes = {
    sut: IController,
    validators: MockValidator 
}

const makeSut = ():SutTypes => {
    //const arrayOfValidations = []
    //arrayOfValidations.push(new RequiredField('word'))
    //arrayOfValidations.push(new TypeVerification('word', 'string'))
   // arrayOfValidations.push(new MockValidator())
   // const validatorCoposite = new ValidatorComposite(arrayOfValidations)
    const validatorSpy = new MockValidator()

    const sut = new GetThreeWords(validatorSpy)
    return {
        sut,
        validators: validatorSpy
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
        console.log(validators.input)
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
})
    /*
    test('Should return 400 if no word is provided', async () => {
        const {sut} = makeSut()
        const request:THttpRequest = {}
        const response = await sut.handle(request)
        expect(response.body).toEqual(new MissingParamError('word'))
        expect(response.statusCode).toBe(400)
    })
    test('Should return 400 if word provided are with wrong type', async () => {
        const {sut} = makeSut()
        const request:THttpRequest = {
            params:{word:10}
        }
        const response = await sut.handle(request)
        expect(response.body).toEqual(new TypeVerificationError('word'))
        expect(response.statusCode).toBe(400)
    })
    
    
    test('Should return an array with three similar results', async() => {
        const {sut} = makeSut()
        const request:THttpRequest = {
            params:{word:'car'}
        }
        const response = await sut.handle(request)
    })
    */
