import 'module-alias/register'
import {Database} from './infra/database/index'
import {createFakeConnection} from './infra/database/fake-database-config'

createFakeConnection().then( instanceConnection => {
    const db = Database.getInstance( instanceConnection )

})