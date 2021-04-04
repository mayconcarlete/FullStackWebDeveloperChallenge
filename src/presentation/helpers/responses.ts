import { THttpResponse } from "@presentation/types"

export const badRequest = (error:Error):THttpResponse => {
    return {
        statusCode: 400,
        body: error
    }
}

export const ok = (data:any):THttpResponse => {
    return {
        statusCode:200,
        body:data
    }
}