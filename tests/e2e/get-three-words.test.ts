import supertest from 'supertest'
import app from '@main/app'
import { TypeVerificationError } from '@presentation/errors'

describe('Get Three Words route e2e', () => {
  test('Should return an array and 200 code if no params are provided', async () => {
    const response = await supertest(app).get('/get-three-words/valid')
    expect(Array.isArray(response.body)).toBe(true)
    expect(response.status).toBe(200)
  })
  test('Should return 400 and a TypeError when invalid param are passed', async () => {
    const response = await supertest(app).get('/get-three-words/1')
    expect(response.body.name).toEqual(new TypeVerificationError('word').name)
  })
})
