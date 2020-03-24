const express = require('express')
const authRouter = express.Router()

authRouter.get('/test', (req, res) => {
  res.status(200).json({ data: '/auth/test' })
})

module.exports = authRouter
