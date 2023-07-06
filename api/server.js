const express = require("express")

const server = express()
server.use(express.json())
const carsRouter = require('./cars/cars-router')

server.use('/api/cars', carsRouter)

server.get('/', (req, res) => {
    res.send('welcome')
})

module.exports = server
