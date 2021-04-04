import { badRequest } from "@presentation/helpers/responses";
import { ISimilarity } from "@presentation/protocols/similarity";
import { IValidate } from "@presentation/protocols/validate";
import { IController } from "../protocols/controller";
import { THttpRequest, THttpResponse } from "../types";

export class GetThreeWords implements IController{
    constructor(
        private readonly validators: IValidate
    ){}
    async handle(request: THttpRequest): Promise<THttpResponse> {
        const input = {...request.body, ...request.params, ...request.headers}
        const error = this.validators.validate(input)
        if(error) return badRequest(error)
        return new Promise(resolve => {
            resolve({
                statusCode:200,
                body:'Hello World'
            })
        })
    }
}