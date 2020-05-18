const mongoose = require('mongoose')

const thumbnailSchema = new mongoose.Schema({
  smallThumbnail: String,
  thumbnail: String
})

const thumbnailModel = mongoose.model('Thumbnail', thumbnailSchema)

module.exports = thumbnailModel
