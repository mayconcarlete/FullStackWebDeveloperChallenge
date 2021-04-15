import { IDatabase } from '@presentation/protocols/database'
import { IInsertDatabase } from '@presentation/protocols/insert-database'

export class MockDatabase implements IDatabase, IInsertDatabase {
  error: Error|undefined
  wordsInDb: string[] = []

  word: string = ''
  resultOfInsert = true

  async getDatabase (): Promise<string[]> {
    return new Promise(resolve => resolve(this.wordsInDb))
  }

  async create (word: string): Promise<boolean> {
    this.word = word
    return this.resultOfInsert
  }
}
