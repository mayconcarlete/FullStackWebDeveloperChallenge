import { ISimilarityAlgorithm } from '@presentation/protocols/similarity'

export class MockCalculateSimilarity implements ISimilarityAlgorithm {
  database: string[] = []
  closestsWords: string[] = []
  async calculateSimilarity (word: string): Promise<string[]> {
    return new Promise(resolve => resolve(this.closestsWords))
  }
}
