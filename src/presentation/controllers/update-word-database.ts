import { badRequest, ok, serverError } from "@presentation/helpers";
import { IController } from "@presentation/protocols";
import { IValidate } from "@presentation/protocols/validate";
import { THttpRequest, THttpResponse } from "@presentation/types";

export class UpdateWordDatabase implements IController{
    constructor(
        private readonly validators: IValidate
    ){}
    handle(request: THttpRequest): Promise<THttpResponse> {
        try{
            const error = this.validators.validate(request.params)
            if(error){
                return new Promise(resolve => resolve(badRequest(error)))
            }
            return new Promise(resolve => resolve(ok("Hello World")))
    }catch(e){
        return new Promise(resolve => resolve(serverError(e)))
        }
    }
}