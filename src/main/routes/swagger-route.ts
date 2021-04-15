import { Express } from 'express'
import { serve, setup } from 'swagger-ui-express'
import swaggerConfig from '@main/swagger'
import { noCacheSwagger } from '@main/middlewares/no-cache-swagger'

export default (app: Express): void => {
  app.use('/api-docs', noCacheSwagger, serve, setup(swaggerConfig))
}
