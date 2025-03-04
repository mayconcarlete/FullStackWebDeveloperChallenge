import { TypeVerificationError } from '@presentation/errors'
import { IValidate } from '@presentation/protocols/validate'
import { ParseInt } from '@presentation/validators/parse-int'

type SutTypes = {
  sut: IValidate
}
const fieldName = 'word'

const makeSut = (): SutTypes => {
  const sut = new ParseInt(fieldName)
  return { sut }
}

describe('Parse Int validator', () => {
  test('Should return an error if parse int return number', () => {
    const { sut } = makeSut()
    const body = {
      [fieldName]: '1'
    }
    const isInt = sut.validate(body)
    expect(isInt).toEqual(new TypeVerificationError(fieldName))
  })
  test('Should return undefined when validations succeeds', () => {
    const { sut } = makeSut()
    const body = {
      [fieldName]: 'valid_value'
    }
    const isInt = sut.validate(body)
    expect(isInt).toBeFalsy()
  })
})
