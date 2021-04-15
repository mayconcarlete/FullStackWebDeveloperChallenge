export class MissingParamError extends Error {
  constructor (fieldName: string) {
    super()
    this.message = `Missing param: ${fieldName}`
    this.name = 'MissingParamError'
  }
}
