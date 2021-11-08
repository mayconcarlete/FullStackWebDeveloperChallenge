import { badRequest, ok, serverError } from '@presentation/helpers'
import { ISimilarityAlgorithm } from '@presentation/protocols/similarity'
import { IValidate } from '@presentation/protocols/validate'
import { IController } from '../protocols/controller'
import { THttpRequest, THttpResponse } from '../types'

export class GetThreeWordsController implements IController {
  constructor (
    private readonly validators: IValidate,
    private readonly similarityAlgorithm: ISimilarityAlgorithm
  ) {}

  async handle (request: THttpRequest): Promise<THttpResponse> {
    try {
      const error = this.validators.validate(request.params)
      if (error) {
        return badRequest(error)
      }
      const word = request.params.word
      const similarWords = await this.similarityAlgorithm.calculateSimilarity(word.toUpperCase())

      return ok(similarWords)
    } catch (error) {
      if (error instanceof Error) {
        return serverError(error)
      }
      throw error
    }
  }
}
