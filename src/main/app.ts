import express from 'express'
import getWords from './routes/get-three-words'
import updateWord from './routes/update-word'

const app = express()
app.use(express.json())

getWords(app)
updateWord(app)

export default app