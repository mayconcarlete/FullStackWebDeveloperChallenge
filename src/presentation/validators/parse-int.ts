import { TypeVerificationError } from '@presentation/errors'
import { IValidate } from '@presentation/protocols/validate'

export class ParseInt implements IValidate {
  constructor (
    private readonly fieldName: string
  ) {}

  validate (input: any): Error | undefined {
    if (!isNaN(input[this.fieldName])) return new TypeVerificationError(this.fieldName)
  }
}
