const express = require('express')
const authRouter = express.Router()
const passport = require('passport')
const passportConfig = require('../helpers/passport')
const authController = require('../controllers/authController')

authRouter.get('/test', authController.authTest)

authRouter.post('/register', authController.authRegister)

// TODO: create auth middleware for DRY approach
authRouter.post(
  '/login',
  passport.authenticate('local', { session: false }),
  authController.authLogin
)

authRouter.get(
  '/logout',
  passport.authenticate('local', { session: false }),
  authController.authLogout
)

authRouter.post(
  '/todo',
  passport.authenticate('jwt', { session: false }),
  authController.authTodo
)

authRouter.get(
  '/todos',
  passport.authenticate('jwt', { session: false }),
  authController.authTodos
)

authRouter.get(
  '/admin',
  passport.authenticate('jwt', { session: false }),
  authController.authAdmin
)

authRouter.get(
  '/authenticated',
  passport.authenticate('jwt', { session: false }),
  authController.authAuthenticated
)

module.exports = authRouter
