import { adaptRoute } from '@main/adapters/controller-adapter'
import { makeDeleteWordController } from '@main/factory/delete-word/make-delete-word-controller'
import { Express } from 'express'

export default async function (app: Express): Promise<void> {
  const deleteWordController = await makeDeleteWordController()
  app.delete('/delete-word/:word', adaptRoute(deleteWordController))
}
