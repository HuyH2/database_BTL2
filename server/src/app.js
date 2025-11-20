const express = require('express')
const cors = require('cors')
const path = require('path')

const itemsRouter = require('./routes/items.routes')

const app = express()
app.use(express.json())

const origin = process.env.CORS_ORIGIN || '*'
app.use(cors({ origin }))

app.use('/api/items', itemsRouter)

// simple health
app.get('/health', (req,res)=> res.json({ ok:true }))

module.exports = app
