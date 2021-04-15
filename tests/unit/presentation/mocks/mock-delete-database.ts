import { IDeleteDatabase } from '@presentation/protocols/delete-database'

export class MockDeleteWordDatabase implements IDeleteDatabase {
  word: string=''
  isDeleted: boolean = true
  async delete (word: string): Promise<boolean> {
    this.word = word
    return this.isDeleted
  }
}
