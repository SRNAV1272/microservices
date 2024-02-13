const { Pool } = require('pg')

function database(user, host, database, password) {
    try {
        const pool = new Pool({
            user: user,
            host: host,
            database: database,
            password: password,
            port: 5432
        })
        return pool
    } catch (e) {
        console.error(e)
        return 0
    }
}
module.exports.database = database
