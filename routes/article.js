const express = require('express')
const router = express.Router()

const moment = require('moment')

const Article = require('../models/article')
const helper = require('../util/helper')

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
  .get(async (req, res) => {
    req.query = Object.assign({ page: 1, pageSize: 2 }, req.query)
    const result = await Article.filterArticles(req.query)
    result.list.map(item => {
      item.created_at = moment(new Date(item.created)).format('YYYY-MM-DD hh:mm')
      item.updated_at = moment(new Date(item.updated)).format('YYYY-MM-DD hh:mm')
      return item
    })
    const pagination = helper.generatePagination(result.count, result.page)
    res.render('b-article-list', {
      activeNav: req.path,
      pagination,
      result
    })
  })

router.route('/articleList/:id')
  .delete(async (req, res) => {
    await Article.findOneAndDelete({ _id: req.params.id })
    res.status(200).send({
      msg: 'Delete successful '
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
  .get((req, res) => {
    const types = [
      '前端开发', 'Node.js', 'Java', '运维', '工具', '读书笔记', '杂谈'
    ]
    Article.findById(req.params.id, (err, result) => {
      res.render('b-article-edit', {
        activeNav: req.path,
        types,
        id: req.params.id,
        data: result
      })
    })
  })


module.exports = router
