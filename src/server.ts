import { Server } from 'http'
import app from './app'
import config from './app/config'
import { seedAdmin } from './app/seed/seed'

process.on('uncaughtException', error => {
  console.log(error)
  process.exit(1)
})

let server: Server
async function main() {
  try {
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`)
      seedAdmin()
    })
  } catch (error) {
    console.log(`Failed to database connected ${error}`)
  }
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.log(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}
main()
process.on('SIGTERM', () => {
  console.log('SIGTERM is received')
  if (server) {
    server.close()
  }
})
