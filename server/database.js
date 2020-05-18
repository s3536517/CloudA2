const connectionUrl = `mongodb://${process.env.dbUsername}:${
  process.env.dbPassword
}@ds133137.mlab.com:33137/books4me`
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

mongoose.connect('mongodb://ds133137.mlab.com:33137/books4me', {
  auth: {
    user: process.env.dbUsername,
    password: process.env.dbPassword
  },
  useNewUrlParser: true
})
mongoose.Promise = global.Promise

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

db.once('open', () => {
  console.log('Connection successful')
})

module.exports = db
