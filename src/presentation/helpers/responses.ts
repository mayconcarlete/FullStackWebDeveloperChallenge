import { THttpResponse } from "@presentation/types"

export const badRequest = (error:Error):THttpResponse => {
    return {
        statusCode: 400,
        body: error
    }
}