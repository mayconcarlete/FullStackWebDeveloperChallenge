import { AlreadyExistsInDb } from '@presentation/errors'
import { badRequest, ok, serverError } from '@presentation/helpers'
import { IController, IUpdateDabase } from '@presentation/protocols'
import { IValidate } from '@presentation/protocols/validate'
import { THttpRequest, THttpResponse } from '@presentation/types'

export class UpdateWordController implements IController {
  constructor (
    private readonly validators: IValidate,
    private readonly updateDatabase: IUpdateDabase
  ) {}

  async handle (request: THttpRequest): Promise<THttpResponse> {
    try {
      const error = this.validators.validate(request.params)
      if (error) {
        return badRequest(error)
      }
      const word = request.params.word
      const wordInserted = await this.updateDatabase.insert(word)
      if (!wordInserted) {
        return badRequest(new AlreadyExistsInDb(word))
      }
      return ok(word)
    } catch (e) {
      return serverError(e)
    }
  }
}
