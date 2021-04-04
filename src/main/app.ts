import express from 'express'
import getWords from './routes/get-three-words'

const app = express()
app.use(express.json())

getWords(app)

export default app