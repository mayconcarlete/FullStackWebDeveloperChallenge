export interface IDeleteDatabase {
  delete: (word: string) => Promise<boolean>
}
