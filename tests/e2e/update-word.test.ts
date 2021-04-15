import supertest from 'supertest'
import app from '@main/app'

describe('Update Word route e2e', () => {
    test('Should return 200 when word is add with success', async () =>{
        const response = await supertest(app).post('/update-word/maycon')
        expect(response.status).toBe(200)
        expect(response.body).toBe('maycon')
    })
    test('Should return 400 when word already exists in database', async () => {
        await supertest(app).post('/update-word/anyword')
        const response = await supertest(app).post('/update-word/anyword')
        expect(response.status).toBe(400)
    })
})