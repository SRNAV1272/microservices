import express from 'express'
import cors from 'cors'
import axios from 'axios'

const app = new express()
const port = process.env.PORT === undefined ? 5001 : parseInt(process.env.PORT)
const exchangeDomain = process.env.Exchange_Domain === undefined ?
    'http://localhost:5000' :
    process.env.Exchange_Domain

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

app.get('/convert/dollartoinr/:number', async (req, res) => {

    console.log(`${exchangeDomain}/`)
    try {
        const result = await axios.get(`${exchangeDomain}/convert/dollartoinr`)
        console.log(result.data)
        res.send({
            number: req.params.number * result.data.number
        })
    } catch (e) {
        console.error(e)
        res.send(e)
    }
})