import { IController } from "../protocols/controller";
import { THttpRequest, THttpResponse } from "../types";

export class GetThreeWords implements IController{
    async handle(request: THttpRequest): Promise<THttpResponse> {
        
        return new Promise(resolve => {
            resolve({
                statusCode:200,
                body:'Hello World'
            })
        })
    }

}