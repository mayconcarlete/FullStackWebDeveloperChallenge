import express from 'express'
import setupSwagger from './routes/swagger-route'
import getWords from './routes/get-three-words'
import updateWord from './routes/update-word'
import deleteWord from './routes/delete-word'

const app = express()

setupSwagger(app)

app.use(express.json())

getWords(app)
updateWord(app)
deleteWord(app)

export default app
