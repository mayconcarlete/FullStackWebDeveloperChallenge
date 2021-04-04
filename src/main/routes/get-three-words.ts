import {Application, json, Router} from 'express'
import {GetThreeWords} from '@presentation/controllers'
import { adaptRoute } from '../adapters/controller-adapter'

export default function(app:Application){
    const controller = new GetThreeWords()
    app.get('/get-three-words', adaptRoute(controller)) 
}