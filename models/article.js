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

ArticleSchema.statics.findOnlineArticles = function (cb) {
  return this.find({ online: true }, cb)
}

ArticleSchema.statics.findAllArticles = function (cb) {
  return this.find({}, cb)
}

module.exports = mongoose.model('article', ArticleSchema)
