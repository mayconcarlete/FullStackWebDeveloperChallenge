import { badRequest, ok } from "@presentation/helpers/responses";
import { ISimilarity } from "@presentation/protocols/similarity";
import { IValidate } from "@presentation/protocols/validate";
import { IController } from "../protocols/controller";
import { THttpRequest, THttpResponse } from "../types";

export class GetThreeWords implements IController{
    constructor(
        private readonly validators: IValidate
    ){}
    async handle(request: THttpRequest): Promise<THttpResponse> {
        const error = this.validators.validate(request.params)
        if(error) return badRequest(error) 
        return new Promise(resolve => {
            resolve(ok('Hello World'))
        })
    }
}