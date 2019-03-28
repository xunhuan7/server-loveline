const mongoose = require('./mongoose')

const ArticleSchema = new mongoose.Schema({
  title: String,
  summary: String,
  status: Boolean,
  tags: Array,
  content: String,
  created: Date,
  updated: Date
}, { collection: 'article' })

module.exports = mongoose.model('article', ArticleSchema)
