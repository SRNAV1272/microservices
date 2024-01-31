import express from 'express'
import cors from 'cors'

const app = new express()
const port = process.env.PORT === undefined ? 5001 : parseInt(process.env.PORT)
const routes = [
    '/'
]

app.use(cors())

app.listen(port, () => {
    console.log(process.env.PORT)
    console.log(`Server is Listening at port ${port} !`)
})

app.get(routes, (req, res) => {
    res.send({
        health: 'Good !'
    })
})

app.get('/convert/dollartoinr', (req, res) => {
    res.send({
        number: 82
    })
})