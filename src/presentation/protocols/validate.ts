import { THttpRequest } from '@presentation/types'

export interface IValidate{
  validate: (input: any) => Error | undefined
}
