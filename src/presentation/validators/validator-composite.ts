import { IValidate } from '@presentation/protocols/validate'

export class ValidatorComposite implements IValidate {
  constructor (
    private readonly validation: IValidate[]
  ) {}

  validate (input: any): Error | undefined {
    for (const validator of this.validation) {
      const error = validator.validate(input)
      if (error) return error
    }
  }
}
