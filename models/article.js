const mongoose = require('./mongoose')

const ArticleSchema = new mongoose.Schema({
  title: String,
  summary: String,
  online: Boolean,
  tags: Array,
  content: String,
  thumbnail: String,
  created: Date,
  updated: Date
}, { collection: 'article' })

ArticleSchema.statics.filterArticles = async function (query) {
  query.page = Number(query.page)
  query.pageSize = Number(query.pageSize)
  const { page, pageSize } = query
  const count = await this.countDocuments({})
  const list = await this.find({}).skip((page - 1) * 2).limit(pageSize).sort({ 'created': -1 })
  return {
    page,
    pageSize,
    count,
    list,
  }
}

module.exports = mongoose.model('article', ArticleSchema)
