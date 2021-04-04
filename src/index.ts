import 'module-alias/register'
import {createFakeConnection} from './infra/database/fake-database-config'
import server from './main/app'

createFakeConnection().then( instanceConnection => {
    server.listen(3000, () => {
        console.log('Uiihaaaa')
    })
})