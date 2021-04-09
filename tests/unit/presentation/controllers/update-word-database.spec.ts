import { UpdateWordDatabase } from "@presentation/controllers/update-word-database"
import { MissingParamError } from "@presentation/errors"
import { IController } from "@presentation/protocols"
import { THttpRequest, THttpResponse } from "@presentation/types"
import { MockValidator } from "../mocks/mock-validatior"

type SutTypes = {
    sut: IController,
    validatorSpy: MockValidator
}


const makeSut = ():SutTypes => {
    const validatorSpy =  new MockValidator()
    const sut = new UpdateWordDatabase(validatorSpy)
    return {sut, validatorSpy}
}

describe('Update Word Database class', () => {
    test('Should return 200 when a request succeeds', async () => {
        const {sut} = makeSut()
        const request:THttpRequest = {
            params:{
                word: "valid_word"
            }
        }
        const response:THttpResponse = await sut.handle(request)
        expect(response.statusCode).toBe(200)
        expect(response.body).toBe("Hello World")
    })
    
    test('Should return 400 when validation fails', async() => {
        const {sut, validatorSpy} = makeSut()
        validatorSpy.error = new MissingParamError('word')
        const request:THttpRequest = {
            params:{
                word:""
            }
        }
        const response:THttpResponse = await sut.handle(request)
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual(validatorSpy.error)
    })
})