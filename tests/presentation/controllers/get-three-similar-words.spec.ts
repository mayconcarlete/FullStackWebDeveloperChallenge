import { GetThreeWords } from '@presentation/controllers'
import {IController} from '@presentation/protocols'
import { THttpRequest } from '@presentation/types'

type SutTypes = {
    sut: IController 
}

const makeSut = ():SutTypes => {
    const sut = new GetThreeWords()
    return {sut}
}

describe('Get Three Words class', () => {
    test('Should return 400 if no word is provided', async () => {
        const {sut} = makeSut()
        const request:THttpRequest = {
            body:{
                "invalid_field": "any_value"
            }
        }
    })
})