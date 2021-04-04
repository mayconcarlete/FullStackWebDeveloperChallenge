import { badRequest, ok, serverError } from "@presentation/helpers";
import { ISimilarity } from "@presentation/protocols/similarity";
import { IValidate } from "@presentation/protocols/validate";
import { IController } from "../protocols/controller";
import { THttpRequest, THttpResponse } from "../types";

export class GetThreeWords implements IController{
    constructor(
        private readonly validators: IValidate,
        private readonly similarity: ISimilarity
    ){}
    async handle(request: THttpRequest): Promise<THttpResponse> {
        try{
            const error = this.validators.validate(request.params)
            if(error) return badRequest(error)
            const word = request.params.word
            console.log(`Looking for: ${word.toUpperCase()}`)
            const similarWords = await this.similarity.calculateSimilarity(word.toUpperCase())
            return ok(similarWords)
        }catch(e){
            return serverError(e)
        }
    }
}