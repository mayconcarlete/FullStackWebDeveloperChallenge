import { Application } from 'express'
import { adaptRoute } from '../adapters/controller-adapter'
import { makeGetThreeWordsControllerFactory } from '../factory/get-three-words/make-get-three-words-controller'

export default async function (app: Application): Promise<void> {
  const getThreeWordsControllerFactory = await makeGetThreeWordsControllerFactory()
  app.get('/get-three-words/:word', adaptRoute(getThreeWordsControllerFactory))
}
