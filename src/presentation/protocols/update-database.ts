export interface IUpdateDabase {
    insert(word:string):Promise<boolean>
}