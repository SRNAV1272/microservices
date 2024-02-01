import express from 'express'
import cors from 'cors'
import axios from 'axios'

const app = new express()
const port = process.env.PORT === undefined ? 5001 : parseInt(process.env.PORT)
const exchangeDenomination = process.env.Exchange_Denomination === undefined ?
    'http://localhost:5000/convert/dollartoinr' :
    process.env.Exchange_Denomination

const routes = [
    '/'
]
// http://localhost:5000/convert/dollartoinr
app.use(cors())

app.listen(port, () => {
    console.log(process.env.PORT)
    console.log(exchangeDenomination)
    console.log(`Server is Listening at port ${port} !`)
})

app.get(routes, (req, res) => {
    res.send({
        health: 'Good !'
    })
})

app.get('/convert/dollartoinr/:number', async (req, res) => {

    console.log(exchangeDenomination)
    try {
        const result = await axios.get(exchangeDenomination)
        console.log(result.data)
        res.send({
            number: req.params.number * result.data.number
        })
    } catch (e) {
        console.error(e)
        res.send(e)
    }
})