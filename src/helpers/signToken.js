const JWT = require('jsonwebtoken')

const signToken = userID =>
  JWT.sign({ iss: 'RickBrown', sub: userID }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  })

module.exports = signToken
