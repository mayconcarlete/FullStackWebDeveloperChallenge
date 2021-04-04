import {Application, json, Router} from 'express'
import { adaptRoute } from '../adapters/controller-adapter'
import { makeGetThreeWordsFactory } from '../factory/get-three-words/make-get-three-words'

export default async function(app:Application){
    const getThreeWordsFactory = await makeGetThreeWordsFactory()
    app.get('/get-three-words/:word', adaptRoute(getThreeWordsFactory)) 
}