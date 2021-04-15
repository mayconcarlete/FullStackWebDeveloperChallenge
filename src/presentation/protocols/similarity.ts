export interface ISimilarityAlgorithm {
  calculateSimilarity: (word: string) => Promise<string[]>
}
