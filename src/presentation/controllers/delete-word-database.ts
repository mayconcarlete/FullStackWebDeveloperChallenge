import { NotExistsInDatabase } from "@presentation/errors";
import { badRequest, ok, serverError } from "@presentation/helpers";
import { IController, IValidate } from "@presentation/protocols";
import { IDeleteDatabase } from "@presentation/protocols/delete-database";
import { THttpRequest, THttpResponse } from "@presentation/types";

export class DeleteWordController implements IController{
    constructor(
        private readonly validators: IValidate,
        private readonly deleteDatabase: IDeleteDatabase
    ){}
    async handle(request: THttpRequest): Promise<THttpResponse> {
        try{
            const error = this.validators.validate(request.params)
            if(error){
                return badRequest(error)
            }
            const wordToDelete = request.params.word
            const resultOfDelete = await this.deleteDatabase.delete(wordToDelete)
            if(!resultOfDelete){
                return badRequest(new NotExistsInDatabase(wordToDelete))
            }
            return ok(wordToDelete)
        }catch(e){
            return serverError(e)
        }
    }
}