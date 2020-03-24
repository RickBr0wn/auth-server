require('dotenv').config()
const express = require('express')
const cookie = require('cookie-parser')
const cors = require('cors')
const helmet = require('helmet')
const mongoose = require('mongoose')
const morgan = require('morgan')

const app = express()
const authRouter = require('./src/api/auth')
const middlewares = require('./src/middlewares')

app.use(cookie())
app.use(express.json())

app.use(morgan('common'))
app.use(helmet())
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.json({
    message: 'Authentication server.',
  })
})

app.use('/auth', authRouter)

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

const PORT = process.env.PORT || 1337

app.listen(PORT, () => {
  console.log(`Express server started on port ${PORT}.`)
})
