import 'module-alias/register'
import {Database} from './database/index'
import {createFakeConnection} from './database/fake-database-config'

createFakeConnection().then( instanceConnection => {
    const db = Database.getInstance( instanceConnection )
    console.log(db.get_data())
})