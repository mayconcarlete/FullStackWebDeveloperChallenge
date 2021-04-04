import 'module-alias/register'
import {Database} from './infra/database/index'
import {createFakeConnection} from './infra/database/fake-database-config'
import server from './main/app'

createFakeConnection().then( instanceConnection => {
    const db = Database.getInstance( instanceConnection )
    server.listen(3000, () => {
        console.log('Ligooou')
    })
})