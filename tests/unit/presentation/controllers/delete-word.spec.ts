import { DeleteWordController } from "@presentation/controllers/delete-word-database"
import { NotExistsInDatabase } from "@presentation/errors"
import { THttpRequest } from "@presentation/types"
import { MockDeleteWordDatabase } from "../mocks/mock-delete-database"

type SutTypes = {
    sut:DeleteWordController
    mockDatabaseSpy:MockDeleteWordDatabase
}

const makeSut = ():SutTypes => {
    const mockDatabaseSpy = new MockDeleteWordDatabase()
    const sut = new DeleteWordController(mockDatabaseSpy)
    return { sut, mockDatabaseSpy }
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
})