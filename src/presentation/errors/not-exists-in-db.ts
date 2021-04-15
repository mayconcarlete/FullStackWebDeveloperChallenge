export class NotExistsInDatabase extends Error {
  constructor (word: string) {
    super()
    this.message = `word ${word} doenst exists in database`
    this.name = 'NotExistsInDatabase'
  }
}
