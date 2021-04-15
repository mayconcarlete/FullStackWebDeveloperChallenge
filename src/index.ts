import 'module-alias/register'
import server from './main/app'

server.listen(process.env.PORT ?? 3000, () => {
  console.log('Lets Rock!!!')
})
