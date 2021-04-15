import { adaptRoute } from '@main/adapters/controller-adapter'
import { makeUpdateWordController } from '@main/factory/update-word/make-update-word-controller'
import { Application } from 'express'

export default async function (app: Application): Promise<void> {
  const updateWordDatabaseController = await makeUpdateWordController()
  app.post('/update-word/:word', adaptRoute(updateWordDatabaseController))
}
