const { Pool } = require('pg')

function database() {
    const pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: '7024',
        port: '5432'
    })

    return pool
}

module.exports.database = database