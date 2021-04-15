import { TypeVerificationError } from '@presentation/errors/type-verification-error'
import { IValidate } from '@presentation/protocols/validate'

export class TypeVerification implements IValidate {
  constructor (
    private readonly fieldName: string,
    private readonly type: string
  ) {}

  validate (input: any): Error | undefined {
    if (typeof (input[this.fieldName]) !== this.type) return new TypeVerificationError(this.fieldName)
  }
}
