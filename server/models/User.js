const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  imageUrl: String,
  fullName: String,
  userState: { type: mongoose.Schema.Types.Mixed, ref: 'UserState' }
})

const userModel = mongoose.model('User', userSchema)

module.exports = userModel
