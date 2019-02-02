const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/loveline', { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', function callback() {
  console.log('数据库连接失败！')
})

db.once('open', function callback() {
  console.log('数据库连接成功!')
})

module.exports = mongoose
