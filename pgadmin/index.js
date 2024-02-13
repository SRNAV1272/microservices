import { database } from "./database.cjs";
import cors from 'cors'
import express from 'express'
import path from 'path'

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(`${process.cwd()}`, "build")))

const pool = database('postgres', 'localhost', 'postgres', 'postgres123')
const port = process.env.PORT === undefined ? 5000 : process.env.PORT
const global_routes = [
    '/'
]

app.listen(port, async () => {
    try {
        console.log(`Server is listening at port ${port}, host ${process.env.host} !`)
    } catch (e) {
        console.error(e)
    }
})

app.get(global_routes, (req, res) => {
    res.sendFile(path.join(`${process.cwd()}`, 'build', 'index.html'))
})

app.get('/host', (req, res) => {
    res.send({ host: process.env.host === undefined ? '127.0.0.1' : process.env.host })
})

app.get('/list_tables', async (req, res) => {
    var db
    try {
        db = await pool.connect()
        const { rows } = await db.query(`
        SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
        `)
        res.send(rows)
    } catch (e) {
        console.error(e)
        res.send(404).json('Database Error !')
    } finally {
        db.release()
    }
})

app.post('/create_table', async (req, res) => {
    const { table_name, columns } = req.body
    console.log(table_name)
    var db
    try {
        db = await pool.connect()
        var queryParams = ''
        columns.forEach(param => {
            queryParams = queryParams + ` ${param.name} ${param.type},`
        })

        const db_res = await db.query(
            `create table ${table_name} (${queryParams})`
        )
        console.log(db_res)
        res.send(`${table_name} table is created in the database !`)
    } catch (e) {
        console.error(e)
        res.send(404).json('Database Error !')
    } finally {
        db.release()
    }
})

app.post('/get_columns', async (req, res) => {
    const { table_name } = req.body
    console.log(table_name)
    var db
    try {
        db = await pool.connect()

        const db_res = await db.query(
            `select * from ${table_name};`
        )
        console.log(db_res)
        res.send(db_res)
    } catch (e) {
        console.error(e)
        res.send(404).json('Database Error !')
    } finally {
        db.release()
    }
})

app.delete('/delete_table', async (req, res) => {
    var db
    try {
        const { table_name } = req.body
        db = await pool.connect()
        const { rows } = await db.query(`drop table ${table_name};`)
        res.send(`${table_name} is deleted successfully !`)
    } catch (e) {
        console.error(e)
        res.send(404).json('Database Error !')
    } finally {
        db.release()
    }
})
