import app from './server'
import db from './repository'

const port = 3000

const start = async () => {
    try {
        await db.authenticate()
        await db.sync()

        await app.listen({port: port})
        app.log.info(`Server listening on http://localhost:` + port)
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}

start()
