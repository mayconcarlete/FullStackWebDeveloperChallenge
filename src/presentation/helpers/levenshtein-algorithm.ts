import { closest } from 'fastest-levenshtein'
import { ISimilarityAlgorithm } from '@presentation/protocols/similarity'
import { IDatabase } from '@presentation/protocols/database'

export class LevenshteinAlgorithm implements ISimilarityAlgorithm {
  private closestsWords: string[] = []

  constructor (
    private readonly database: IDatabase
  ) {}

  async calculateSimilarity (word: string): Promise<string[]> {
    const wordsInDb = await this.database.getDatabase()
    const clonedDb = [...wordsInDb]
    if (clonedDb.length < 3) return clonedDb
    this.closestsWords = this.getClosestsWords(word, clonedDb)
    return this.closestsWords
  }

  private getClosestsWords (word: string, clonedDb: string[]): string[] {
    const closestsWords = []
    while (closestsWords.length < 3) {
      const closestWord: string = closest(word, clonedDb)
      closestsWords.push(closestWord)
      clonedDb.splice(clonedDb.indexOf(closestWord), 1)
    }
    return closestsWords
  }
}
