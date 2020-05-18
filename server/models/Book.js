const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  author: [String],
  averageRating: Number,
  categories: [String],
  description: String,
  id: String,
  infoLink: String,
  pageCount: Number,
  ratingsCount: Number,
  subtitle: String,
  thumbnail: [{ type: mongoose.Schema.Types.Mixed, ref: 'Thumbnail' }],
  title: String
})

const bookModel = mongoose.model('Book', bookSchema)

module.exports = bookModel
