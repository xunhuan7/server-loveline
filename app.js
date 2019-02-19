// Connect to mongodb
require('./models/mongoose')

const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const jwt = require('jsonwebtoken')

// Custom controllers
const validateRouter = require('./routes/validate')

const app = express()

// JWT authentication
app.use(function (req, res, next) {
  const unless = ['/register', '/login']
  let isNeedVerify = true
  unless.forEach(path => {
    if (req.originalUrl.indexOf(path) > -1) {
      isNeedVerify = false
    }
  })

  if (isNeedVerify) {
    jwt.verify(req.headers['authorization'], 'secret', function (err, decode) {
      if (err) {
        res.status(401).send({
          msg: 'Invalid token...'
        })
      } else {
        res.locals.username = decode.username
        return next()
      }
    })
  } else {
    next()
  }
})

// Apply middleware
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Apply custom controllers
app.use(validateRouter)

// catch 404 and forward to error handler
app.use(function (req, res) {
  res.status(404).send({
    msg: 'Not Found'
  })
})

module.exports = app
