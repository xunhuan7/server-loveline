const express = require('express')
const router = express.Router()

const User = require('../models/user')

router.route('/register')
  .post((req, res) => {
    const user = new User({
      ...req.body,
      created: Date.now()
    })
    user.save((err, result) => {
      if (err) {
        return err
      }
      res.send({
        msg: 'Register succeed'
      })
    })
  })

router.route('/login')
  .post((req, res) => {
    User.findOne({ ...req.body }, (err, result) => {
      if (err) {
        return err
      }
      if (result === null) {
        res.status(500).send({
          msg: 'User does not exist'
        })
      } else {
        res.status(200)
          .cookie('token', 'tokenID', {
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
           })
          .send({
            msg: 'Login succeed'
          })
      }
    })
  })

module.exports = router
