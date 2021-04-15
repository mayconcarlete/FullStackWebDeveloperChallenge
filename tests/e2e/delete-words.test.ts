import supertest from 'supertest'
import app from '@main/app'

describe('Delete Word route e2e', () => {
  test('Should return 200 when word is success deleted', async () => {
    await supertest(app).post('/update-word/anyword')
    const response = await supertest(app).delete('/delete-word/anyword')
    expect(response.status).toBe(200)
  })
  test('Should return 400 when word does not exists in database', async () => {
    await supertest(app).delete('/delete-word/anyword')
    const response = await supertest(app).delete('/delete-word/anyword')
    expect(response.status).toBe(400)
  })
})
