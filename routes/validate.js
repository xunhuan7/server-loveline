const express = require('express')
const router = express.Router()

const jwt = require('jsonwebtoken')

const User = require('../models/user')

router.route('/register')
  .post((req, res) => {
    const user = new User({
      ...req.body,
      created: Date.now()
    })
    User.findOne({ username: req.body.username }, (err, result) => {
      if (err) {
        return err
      }
      if (result) {
        res.status(500).send({
          msg: 'User exists'
        })
      } else {
        user.save((err) => {
          if (err) {
            throw err
          }
          res.status(200).send({
            msg: 'Register succeed'
          })
        })
      }
    })
  })

router.route('/login')
  .post((req, res) => {
    User.findOne({ username: req.body.username }, (err, result) => {
      if (err) {
        return err
      }
      if (result === null) {
        res.status(500).send({
          msg: 'User does not exist'
        })
      } else if (result) {
        if (result.password !== req.body.password) {
          res.status(500).send({
            msg: 'Password is incorrect'
          })
        } else {
          const token = jwt.sign({ username: result.username }, 'secret', {
            expiresIn: 7 * 24 * 60 * 60
          })
          res.status(200).send({
            msg: 'Login succeed',
            tokenId: token
          })
        }
      }
    })
  })

module.exports = router
