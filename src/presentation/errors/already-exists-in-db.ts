export class AlreadyExistsInDb extends Error {
    constructor(word:string){
        super()
        this.name = 'AlreadyExistsInDb'
        this.message = `${word} already exists in Database`
    }
}