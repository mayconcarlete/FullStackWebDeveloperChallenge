import { DeleteWordController } from "@presentation/controllers"
import { MissingParamError, NotExistsInDatabase } from "@presentation/errors"
import { THttpRequest } from "@presentation/types"
import { MockDeleteWordDatabase } from "../mocks/mock-delete-database"
import { MockValidator } from "../mocks/mock-validatior"

type SutTypes = {
    sut:DeleteWordController
    mockValidatorSpy: MockValidator
    mockDatabaseSpy:MockDeleteWordDatabase
}

const makeSut = ():SutTypes => {
    const mockValidatorSpy = new MockValidator()
    const mockDatabaseSpy = new MockDeleteWordDatabase()
    const sut = new DeleteWordController(mockValidatorSpy, mockDatabaseSpy)
    return { sut, mockValidatorSpy, mockDatabaseSpy }
}

describe('Delete Word Controller class', () =>{
    test('Should return the deleted word on success', async () => {
        const { sut } = makeSut()
        const request:THttpRequest = {
            params:{
                word:'valid_word'
            }
        }
        const response = await sut.handle(request)
        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(request.params.word)
    })

    test('Should return 400 when any validator fails', async() => {
        const {sut , mockValidatorSpy} = makeSut()
        mockValidatorSpy.error = new MissingParamError('word')
        const request:THttpRequest = {
            params:{
                word:'invalid_param'
            }
        }
        const response = await sut.handle(request)
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual(new MissingParamError('word'))
    })

    test('Should return 400 when word doenst exists in database', async() => {
        const {sut, mockDatabaseSpy} = makeSut()
        const request:THttpRequest = {
            params:{
                word:'invalid_word'
            }
        }
        mockDatabaseSpy.isDeleted = false
        const response = await sut.handle(request)
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual(new NotExistsInDatabase(request.params.word))
    })

    test('Should return 500 if DeleteWord helper throws', async () => {
        const {sut, mockDatabaseSpy} = makeSut()
        const request:THttpRequest = {
            params:{
                word:'any_word'
            }
        }
        jest.spyOn(mockDatabaseSpy, 'delete').mockImplementationOnce(async () => {
            return new Promise(() => {
                throw new Error()
            })
        })
        const response = await sut.handle(request)
        expect(response.statusCode).toBe(500)
    })
})