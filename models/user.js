const mongoose = require('./mongoose')

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  nickname: String,
  gender: String,
  created: Date
}, { collection: 'user' })

module.exports = mongoose.model('user', UserSchema)