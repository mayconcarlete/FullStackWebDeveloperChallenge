export class TypeVerificationError extends Error {
    constructor(
        private readonly fieldName: string
    ){
        super()
        this.message = `Type of field ${this.fieldName} are invalid`
        this.name = 'TypeVerificationError'
    }
}