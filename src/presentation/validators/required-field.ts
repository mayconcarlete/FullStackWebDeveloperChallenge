import { MissingParamError } from '@presentation/errors'
import { IValidate } from '@presentation/protocols/validate'

export class RequiredField implements IValidate {
  constructor (
    private readonly fieldName: string
  ) {}

  validate (input: any): Error | undefined {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
  }
}
