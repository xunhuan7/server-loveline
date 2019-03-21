const express = require('express')
const router = express.Router()

const jwt = require('jsonwebtoken')

const User = require('../models/user')

router.route('/articleList')
  .get((req, res) => {
    res.render('b-article-list')
  })
  .post((req, res) => {
    User.findOne({ username: req.body.email }, (err, result) => {
      if (result === null) {
        return res.render('b-login', {
          status: 0,
          message: 'User does not exist'
        })
      }
      if (result) {
        if (result.password !== req.body.password) {
          return res.render('b-login', {
            status: 0,
            message: 'Password is incorrect'
          })
        }
        const token = jwt.sign({ username: result.username }, 'secret', {
          expiresIn: 7 * 24 * 60 * 60
        })
        res.cookie('token', token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60)
        }).redirect('/categoriesList')
      }
    })
  })

router.route('/tempArticleList')
  .get((req, res) => {
    res.render('b-temp-article-list')
  })
  .post((req, res) => {
    User.findOne({ username: req.body.email }, (err, result) => {
      if (result === null) {
        return res.render('b-login', {
          status: 0,
          message: 'User does not exist'
        })
      }
      if (result) {
        if (result.password !== req.body.password) {
          return res.render('b-login', {
            status: 0,
            message: 'Password is incorrect'
          })
        }
        const token = jwt.sign({ username: result.username }, 'secret', {
          expiresIn: 7 * 24 * 60 * 60
        })
        res.cookie('token', token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60)
        }).redirect('/categoriesList')
      }
    })
  })

module.exports = router
