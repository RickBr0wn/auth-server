const User = require('../models/User')
// const passport = require('passport')
// const passportConfig = require('../helpers/passport')
const signToken = require('../helpers/signToken')

exports.authTest = (req, res) => {
  res.status(200).json({ data: '/auth/test' })
}

exports.authRegister = (req, res) => {
  const { username, password, role } = req.body
  User.findOne({ username }, (err, user) => {
    if (err) {
      res.status(500).json({
        message: { msgBody: 'An error has occurred.', msgError: true },
      })
    }
    if (user) {
      res.status(400).json({
        message: {
          msgBody: 'Username has already been taken.',
          msgError: true,
        },
      })
    } else {
      const newUser = new User({ username, password, role })
      newUser.save(err => {
        if (err) {
          res.status(500).json({
            message: {
              msgBody: 'An error has occurred whilst saving the user.',
              msgError: true,
            },
          })
        } else {
          res.status(201).json({
            message: {
              msgBody: 'Account created successfully.',
              msgError: false,
            },
          })
        }
      })
    }
  })
}

exports.authLogin = (req, res) => {
  if (req.isAuthenticated()) {
    const { _id, username, role } = req.user
    const token = signToken(_id)
    res.cookie('access_token', token, { httpOnly: true, sameSite: true })
    res.status(200).json({ isAuthenticated: true, user: { username, role } })
  }
}

exports.authLogout = (req, res) => {
  res.clearCookie('access_token')
  res.status(200).json({ user: { username: '', role: '' }, success: true })
}

exports.authTodo = (req, res) => {
  const todo = new Todo(req.body)
  todo.save(err => {
    if (err) {
      res.status(500).json({
        message: {
          msgBody: 'An error has occurred with the todos.',
          msgError: true,
        },
      })
    }
    req.user.todos.push(todo)
    req.user.save(err => {
      // TODO: create error middleware for DRY approach
      if (err) {
        res.status(500).json({
          message: {
            msgBody: 'An error has occurred when saving the new todo.',
            msgError: true,
          },
        })
      }
      res.status(200).json({
        message: { msgBody: 'Successfully created todo', msgError: false },
      })
    })
  })
}

exports.authTodos = (req, res) => {
  User.findById({ _id: req.user._id })
    .populate('todos')
    .exec((err, doc) => {
      if (err) {
        res.status(500).json({
          message: {
            msgBody:
              'An error has occurred whilst populating the `user` todo array.',
            msgError: true,
          },
        })
      }
      res.status(200).json({ todos: doc.todos, authenticated: true })
    })
}

exports.authAdmin = (req, res) => {
  if (req.user.role === 'admin') {
    res
      .status(200)
      .json({ message: { msgBody: 'You are an admin', msgError: false } })
  } else {
    res.status(403).json({
      message: { msgBody: 'You are not an admin, go away.', msgError: true },
    })
  }
}

exports.authAuthenticated = (req, res) => {
  const { username, role } = req.user
  res.status(200).json({ isAuthenticated: true, user: { username, role } })
}
