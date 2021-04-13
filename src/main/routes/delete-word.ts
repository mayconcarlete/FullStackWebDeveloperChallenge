import { adaptRoute } from '@main/adapters/controller-adapter'
import app from '@main/app'
import { makeDeleteWordController } from '@main/factory/delete-word/make-delete-word-controller'
import {Application, Express} from 'express'

export default async function(app:Express){
    const deleteWordController = await makeDeleteWordController()
    app.delete('delete-word/word', adaptRoute( deleteWordController ))
}