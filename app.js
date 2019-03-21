// Connect to mongodb
require('./models/mongoose')

const express = require('express')
const nunjucks = require('nunjucks')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const lessMiddleware = require('less-middleware')
const jwt = require('jsonwebtoken')

// Custom controllers
const index = require('./routes/index')
const validateRouter = require('./routes/validate')
const articleRouter = require('./routes/article')

const app = express()
app.use(lessMiddleware(__dirname + '/public', { force: true }))
// Template engine
nunjucks.configure('views', {
  noCache: true,
  express: app
})
app.set('view engine', 'njk');
app.set('views', path.resolve(__dirname, './views'));
// JWT authentication
// app.use(function (req, res, next) {
//   const need = ['/write']
//   let isNeedVerify = false
//   need.forEach(path => {
//     if (req.originalUrl.indexOf(path) > -1) {
//       isNeedVerify = false
//     }
//   })
//
//   if (isNeedVerify) {
//     jwt.verify(req.headers['authorization'], 'secret', function (err, decode) {
//       if (err) {
//         res.status(401).send({
//           msg: 'Invalid token...'
//         })
//       } else {
//         res.locals.username = decode.username
//         return next()
//       }
//     })
//   } else {
//     next()
//   }
// })

// Apply middleware
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Apply custom controllers
app.use(index)
app.use(validateRouter)
app.use(articleRouter)

// catch 404 and forward to error handler
app.use(function (req, res) {
  res.status(404).send({
    msg: 'Not Found'
  })
})

module.exports = app
