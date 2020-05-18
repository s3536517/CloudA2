const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./server/database.js')
const port = process.env.PORT || 3000

// Mongoose Models
var User = require('./server/models/User')
//const UserState = require('./models/UserState')
function decrypt(text) {
  var oneLayer = new Buffer(text, 'base64')
  var twoLayer = new Buffer(oneLayer.toString(), 'base64')
  return twoLayer.toString()
}

app.use(express.static(path.join(__dirname, 'client/build')))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

app.post('/api/save', (req, res) => {
  User.findOneAndUpdate({ email: req.body.email }, req.body, {}, function(
    err,
    user
  ) {
    if (user) {
      res.send({
        user
      })
    } else {
      if (err) {
        console.log(err)
      } else {
        User.create(req.body)
          .then(() => res.send(true))
          .catch(err => console.log(err))
      }
    }
  })
})

app.get('/api/retrieveSave', (req, res) => {
  let userEmail = null

  if (req.query.hash) {
    userEmail = decrypt(req.query.hash)
  } else {
    userEmail = req.query.email
  }

  console.log("User's email: " + userEmail)

  User.findOne({ email: userEmail })
    .then(data => res.send(data))
    .catch(err => console.log(err))
})

app.get('/api/healthcheck', (req, res) => {
  res.send('Hello!')
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'))
})

app.listen(port, () => console.log('Listening on 3000'))

/*
app.post('/api/user', (req, res) => {
	//console.log(req.body)
	var user = new User(req.body.user); 
	console.log(user);

	User.create(req.body)
		.then(() => res.send(true))
		.catch(() => res.send(false))
})
*/

/*
if (mongoose.Types.ObjectId.isValid(userId.id)){         User.findById(userId.id)
  .then((doc)=> { 
     if (doc) {
       console.log(doc)
     } else {
       console.log("No data exist for this id");
     }
 })
.catch((err)=> {
    console.log(err);
 });
} else {
  console.log("Please provide correct Id");
}
*/
