import { IValidate } from '@presentation/protocols/validate'
import {ValidatorComposite} from '@presentation/validators'
import {MissingParamError} from '@presentation/errors'

type SutTypes = {
    sut: IValidate
    validations: MockValidator[]
}

class MockValidator implements IValidate{
    error:Error | undefined = undefined
    validate(input: any): Error | undefined {
        return this.error
    }
}    

const makeSut = ():SutTypes => {
    const validations:MockValidator[] = []
    validations.push(new MockValidator())
    validations.push(new MockValidator())

    const sut = new ValidatorComposite(validations)
    return { sut, validations }
}

describe('Validator Composite class', () => {
    test('Should return an error if any validator fails', () => {
        const {sut, validations} = makeSut()
        validations[1].error = new Error('any error')
        const error = sut.validate('wrong data')
        expect(error).toEqual(new Error('any error'))
    })

    test('Should return the first error if more then one validator fails', () => {
        const {sut, validations} = makeSut()
        validations[0].error = new MissingParamError('missing param')
        validations[1].error = new Error('some error')
        const error = sut.validate('wrong data')
        expect(error).toEqual(new MissingParamError('missing param'))
    })

    
})