const express = require('express')
const router = express.Router()

const moment = require('moment')

const Article = require('../models/article')

router.route('/newArticle')
  .get((req, res) => {
    const types = [
      '前端开发', 'Node.js', 'Java', '运维', '工具', '读书笔记', '杂谈'
    ]
    res.render('b-article-new', { activeNav: req.path, types })
  })
  .post((req, res) => {
    const { tags = [], content = '' } = req.body
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
      updated: Date.now()
    })

    article.save(err => {
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
    Article.findAllArticles((err, result) => {
      let data = result.map(item => {
        Object.assign(item, {
          created_at: moment(new Date(item.created)).format('YYYY-MM-DD hh:mm'),
          updated_at: moment(new Date(item.updated)).format('YYYY-MM-DD hh:mm')
        })
        return item
      })
      res.render('b-article-list', {
        activeNav: req.path,
        data: data
      })
    })
  })

router.route('/articleList/:id')
  .get((req, res) => {
    const types = [
      '前端开发', 'Node.js', 'Java', '运维', '工具', '读书笔记', '杂谈'
    ]
    Article.findById(req.params.id, (err, result) => {
      result.created_at = moment(result.created).format('YYYY-MM-DD HH:MM')
      result.updated_at = moment(result.updated).format('YYYY-MM-DD HH:MM')
      res.render('b-article-edit', {
        activeNav: req.path,
        types,
        id: req.params.id,
        data: result
      })
    })
  })
  .put((req, res) => {
    Article.updateOne({ _id: req.params.id }, {
      ...req.body,
      updated: Date.now()
    }, function (err, result) {
      if (err) {
        throw err
      }
      res.status(200).send({
        msg: 'Update successful '
      })
    })
  })

module.exports = router
