import { Database } from '@infra/database'
import { createFakeConnection } from '@infra/database/fake-database-config'
import { DeleteWordController } from '@presentation/controllers'
import { DeleteDatabase } from '@presentation/helpers/delete-database'
import { ParseInt, RequiredField, TypeVerification, ValidatorComposite } from '@presentation/validators'

export const makeDeleteWordController = async (): Promise<DeleteWordController> => {
  const fieldName = 'word'

  const arrayOfValidators = []
  arrayOfValidators.push(new RequiredField(fieldName))
  arrayOfValidators.push(new TypeVerification(fieldName, 'string'))
  arrayOfValidators.push(new ParseInt(fieldName))

  const validators = new ValidatorComposite(arrayOfValidators)

  const createDatabaseFromTxt = await createFakeConnection()
  const database = Database.getInstance(createDatabaseFromTxt)
  const deleteDatabase = new DeleteDatabase(database)

  const deleteWordController = new DeleteWordController(validators, deleteDatabase)

  return deleteWordController
}
