import { IValidate } from '@presentation/protocols/validate'
import { TypeVerification } from '@presentation/validators/type-verification'
import { TypeVerificationError } from '@presentation/errors'

type SutTypes = {
  sut: IValidate
}
const fieldName = 'field_to_validate'
const type = 'string'

const makeSut = (): SutTypes => {
  const sut = new TypeVerification(fieldName, type)
  return { sut }
}

describe('Type Verification class', () => {
  test('Should call validate with correct params', () => {
    const { sut } = makeSut()
    const validateSpy = jest.spyOn(sut, 'validate')
    const body = {
      [fieldName]: 'any_value'
    }
    sut.validate(body)
    expect(validateSpy).toHaveBeenCalledWith({ [fieldName]: 'any_value' })
  })

  test('Should return an error if type of field are different of passed', () => {
    const { sut } = makeSut()
    const body = {
      [fieldName]: 10
    }
    const isType = sut.validate(body)
    expect(isType).toEqual(new TypeVerificationError(fieldName))
  })

  test('Should be undefined if validation succeeds', () => {
    const { sut } = makeSut()
    const body = {
      [fieldName]: 'valid_value'
    }
    const isType = sut.validate(body)
    expect(isType).toBeFalsy()
  })
})
