const express = require('express')
const router = express.Router()

const jwt = require('jsonwebtoken')

const Article = require('../models/article')

router.route('/newArticle')
  .get((req, res) => {
    const types = [
      '前端开发', 'Node.js', 'Java', '运维', '工具', '读书笔记', '杂谈'
    ]
    res.render('b-new-article', {
      types
    })
  })
  .post((req, res) => {
    const { tags = [], content = '' } = req.body
    console.log('ss',req.body,'ee')
    if (tags.length === 0) {
      return res.status(500).send({
        msg: '分类为必填字段'
      })
    }
    if (content === '') {
      return res.status(500).send({
        msg: '正文不能为空'
      })
    }
    const article = new Article({
      ...req.body,
      created: Date.now(),
      updated: Date.now(),
    })

    article.save(err=>{
      if (err) {
        throw err
      }
      res.status(200).send({
        msg: 'Saving article succeed'
      })
    })
  })

router.route('/articleList')
  .get((req, res) => {
    res.render('b-article-list')
  })
  .post((req, res) => {
    Article.findOne({ username: req.body.email }, (err, result) => {
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
    Article.findOne({ username: req.body.email }, (err, result) => {
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
