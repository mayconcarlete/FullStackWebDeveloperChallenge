export interface IInsertDatabase{
    create(word:string):Promise<boolean>
}