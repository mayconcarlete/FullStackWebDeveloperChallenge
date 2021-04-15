import { IController } from '@presentation/protocols'
import { Request, Response } from 'express'

export const adaptRoute = (controller: IController) => {
  return async function (req: Request, res: Response) {
    const response = await controller.handle(req)
    return res.status(response.statusCode).json(response.body)
  }
}
