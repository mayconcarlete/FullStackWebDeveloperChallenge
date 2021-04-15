import { Database } from '@infra/database'
import { createFakeConnection } from '@infra/database/fake-database-config'
import { UpdateWordController } from '@presentation/controllers'
import { InsertDatabase } from '@presentation/helpers'
import { ParseInt, RequiredField, TypeVerification, ValidatorComposite } from '@presentation/validators'

export const makeUpdateWordController = async (): Promise<UpdateWordController> => {
  const fieldName = 'word'

  const arrayOfValidations = []
  arrayOfValidations.push(new RequiredField(fieldName))
  arrayOfValidations.push(new TypeVerification(fieldName, 'string'))
  arrayOfValidations.push(new ParseInt(fieldName))

  const validators = new ValidatorComposite(arrayOfValidations)

  const createDatabaseFromTxt = await createFakeConnection()
  const database = Database.getInstance(createDatabaseFromTxt)
  const insertInDatabase = new InsertDatabase(database)

  const updateWordDatabaseController = new UpdateWordController(validators, insertInDatabase)
  return updateWordDatabaseController
}
