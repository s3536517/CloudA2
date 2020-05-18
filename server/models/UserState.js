const mongoose = require('mongoose')

const userStateSchema = new mongoose.Schema({
  books: [{ type: mongoose.Schema.Types.Mixed, ref: 'Book' }],
  columns: [{ type: mongoose.Schema.Types.Mixed, ref: 'Column' }],
  columnOrder: [String]
})

const userStateModel = mongoose.model('UserState', userStateSchema)

module.exports = userStateModel
