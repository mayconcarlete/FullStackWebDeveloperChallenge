import supertest from 'supertest'
import app from '@main/app'
import { request } from 'express'
import { MissingParamError } from '@presentation/errors'


describe('Get Three Words class e2e', () => {
    test('Should return an array and 200 code if no params are provided', async() => {
        const response = await supertest(app).get('/get-three-words/valid')
        console.log(typeof(response.body))
        expect(Array.isArray(response.body)).toBe(true)
        expect(response.status).toBe(200)
    })
})

