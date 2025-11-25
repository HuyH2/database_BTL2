const express = require('express')
const cors = require('cors')
const path = require('path')

const itemsRouter = require('./routes/items.routes')
const courseRouter = require('./routes/course.routes')
const authRouter = require('./routes/auth.routes')
const userAccountRouter = require('./routes/userAccount.routes') // Clean new implementation

const app = express()
app.use(express.json())

const origin = process.env.CORS_ORIGIN || '*'
app.use(cors({ origin }))

app.use('/api/items', itemsRouter)
app.use('/api/courses', courseRouter)
app.use('/api/auth', authRouter)
app.use(userAccountRouter) // Clean UserAccount routes

// simple health
app.get('/health', (req,res)=> res.json({ ok:true }))

module.exports = app
