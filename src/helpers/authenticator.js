const passport = require('passport')
const passportConfig = require('./passport')

module.exports = function() {
  return passport.authenticate('local', { session: false })
}
