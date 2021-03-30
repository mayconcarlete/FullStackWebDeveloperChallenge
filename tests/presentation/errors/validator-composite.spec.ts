import { IValidate } from '@presentation/protocols/validate'
import {ValidatorComposite} from '@presentation/validators'
import { MissingParamError } from '.'

type SutTypes = {
    sut: IValidate
}

class MockValidator implements IValidate{
    constructor(
        private readonly error: Error
        ){}
    validate(input: any): Error | undefined {
        return this.error
    }

}

const makeSut = ():SutTypes => {
    const firstError = new MockValidator(new Error('first error'))
    const secondError = new MockValidator(new Error('second error'))
    const validations:IValidate[] = []
    validations.push(firstError)
    validations.push(secondError)

    const sut = new ValidatorComposite(validations)
    return { sut }
}

describe('Validator Composite class', () => {
    test('Should return the first error when validate', () => {
        const { sut } = makeSut()
        const result = sut.validate('foo')
        expect(result).toEqual(new Error('first error'))
    })
})