import { GetThreeWords } from '@presentation/controllers'
import { MissingParamError, TypeVerificationError } from '@presentation/errors'
import {IController} from '@presentation/protocols'
import { THttpRequest, THttpResponse } from '@presentation/types'
import { RequiredField, ValidatorComposite } from '@presentation/validators'
import { TypeVerification } from '@presentation/validators/type-verification'

type SutTypes = {
    sut: IController 
}

const makeSut = ():SutTypes => {
    const arrayOfValidations = []
    arrayOfValidations.push(new RequiredField('word'))
    arrayOfValidations.push(new TypeVerification('word', 'string'))
    const validatorCoposite = new ValidatorComposite(arrayOfValidations)
    const sut = new GetThreeWords(validatorCoposite)
    return {sut}
}

describe('Get Three Words class', () => {
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
})