import { GetThreeWordsController } from "@presentation/controllers";
import { CalculateSimilarity } from "@presentation/helpers";
import { IValidate } from "@presentation/protocols/validate";
import { RequiredField, ValidatorComposite,TypeVerification,ParseInt } from "@presentation/validators";
import { Database } from "@infra/database";
import { createFakeConnection } from "@infra/database/fake-database-config";

export const makeGetThreeWordsControllerFactory = async ():Promise<GetThreeWordsController> => {
    const fieldName = 'word'
    const arrayOfValidations: IValidate[] = []
    arrayOfValidations.push(new RequiredField(fieldName))
    arrayOfValidations.push(new TypeVerification(fieldName, 'string'))
    arrayOfValidations.push(new ParseInt(fieldName))
    const validators = new ValidatorComposite(arrayOfValidations)
    
    const createDatabaseFromTxt = await createFakeConnection()
    const database = Database.getInstance(createDatabaseFromTxt)
    const similarity = new CalculateSimilarity(database)
    
    const getThreeWords = new GetThreeWordsController(validators, similarity)
    return getThreeWords
}