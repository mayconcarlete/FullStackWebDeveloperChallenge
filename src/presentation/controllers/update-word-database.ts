import { badRequest, ok, serverError } from "@presentation/helpers";
import { IController, IUpdateDabase } from "@presentation/protocols";
import { IValidate } from "@presentation/protocols/validate";
import { THttpRequest, THttpResponse } from "@presentation/types";

export class UpdateWordDatabaseController implements IController{
    constructor(
        private readonly validators: IValidate,
        private readonly updateDatabase: IUpdateDabase
    ){}
    async handle(request: THttpRequest): Promise<THttpResponse> {
        try{
            const error = this.validators.validate(request.params)
            if(error){
                return badRequest(error)
            }
            const word = request.params.word
            const wordInserted = await this.updateDatabase.insert(word)
            return ok('Hello World')
    }catch(e){
        return serverError(e)
        }
    }
}