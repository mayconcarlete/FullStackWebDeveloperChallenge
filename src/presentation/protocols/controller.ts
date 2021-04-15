import { THttpRequest, THttpResponse } from '../types'

export interface IController {
  handle: (request: THttpRequest) => Promise<THttpResponse>
}
