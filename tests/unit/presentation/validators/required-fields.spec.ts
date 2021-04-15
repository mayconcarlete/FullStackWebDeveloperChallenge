import { MissingParamError } from '@presentation/errors'
import { IValidate } from '@presentation/protocols/validate'
import { RequiredField } from '@presentation/validators'

const fieldName = 'valid_field'

type SutTypes = {
  sut: IValidate
}

const makeSut = (): SutTypes => {
  const sut = new RequiredField(fieldName)
  return { sut }
}

describe('Required Field class', () => {
  test('Should return MissingParamErro when word is missing', () => {
    const { sut } = makeSut()
    const input = {}
    const requiredFieldsResult = sut.validate(input)
    expect(requiredFieldsResult).toEqual(new MissingParamError(fieldName))
  })
  test('Should return undefined when RequiredFields succeeds', () => {
    const { sut } = makeSut()
    const input = {
      [fieldName]: 'any_value'
    }
    const requiredFieldsResult = sut.validate(input)
    expect(requiredFieldsResult).toBeFalsy()
  })
})
