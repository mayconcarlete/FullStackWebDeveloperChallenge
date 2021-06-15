import 'module-alias/register'
import server from './main/app'

const PORT = process.env.PORT ?? 3000

server.listen(PORT, () => {
  console.log(`We are online on port: ${PORT}!!!`)
})
