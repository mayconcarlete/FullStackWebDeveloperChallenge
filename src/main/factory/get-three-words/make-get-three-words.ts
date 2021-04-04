import { GetThreeWords } from "@presentation/controllers";
import { CalculateSimilarity } from "@presentation/helpers";
import { IValidate } from "@presentation/protocols/validate";
import { RequiredField, ValidatorComposite } from "@presentation/validators";
import { TypeVerification } from "@presentation/validators/type-verification";
import { Database } from "src/infra/database";
import { createFakeConnection } from "src/infra/database/fake-database-config";

export const makeGetThreeWordsFactory = async ():Promise<GetThreeWords> => {
    const fieldName = 'word'
    const arrayOfValidations: IValidate[] = []
    arrayOfValidations.push(new RequiredField(fieldName))
    arrayOfValidations.push(new TypeVerification(fieldName, 'string'))
    const validators = new ValidatorComposite(arrayOfValidations)
    
    const createDatabaseFromTxt = await createFakeConnection()
    const database = Database.getInstance(createDatabaseFromTxt)
    const similarity = new CalculateSimilarity(database)
    
    const getThreeWords = new GetThreeWords(validators, similarity)
    return getThreeWords
}