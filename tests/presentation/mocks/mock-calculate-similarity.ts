import { ISimilarity } from "@presentation/protocols/similarity";

export class MockCalculateSimilarity implements ISimilarity{
    database:string[] = []
    closestsWords:string[] = []
    calculateSimilarity(word: string): Promise<string[]> {
        return new Promise(resolve => resolve(this.closestsWords))
    }
}