const mongoose = require('mongoose')

const columnSchema = new mongoose.Schema({
  bookIDs: [{ type: mongoose.Schema.Types.Mixed, ref: 'Book' }],
  id: String,
  title: String
})

const columnModel = mongoose.model('Column', columnSchema)

module.exports = columnModel
