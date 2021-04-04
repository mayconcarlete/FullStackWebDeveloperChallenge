import { IValidate } from "@presentation/protocols/validate";

export class MockValidator implements IValidate{
    error:Error|undefined
    input:any
    validate(input: any): Error | undefined {
        this.input = input
        return this.error
    }
}