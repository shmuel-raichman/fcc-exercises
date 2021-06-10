const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require("dotenv").config();
const cors = require('cors');
const dbInserts = require(`${__dirname}/db_inserts.js`);
const dbFinds = require(`${__dirname}/db_finds.js`);


// const mongoose = require('mongoose')
// mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/exercise-track' )

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});


// // Not found middleware
// app.use((req, res, next) => {
//   console.log("not-found");
//   return next({status: 404, message: 'not found'});
// });


// Error Handling middleware
app.use((err, req, res, next) => {
  let errCode, errMessage
  console.log("error: ", err);
  if (err.errors) {
    // mongoose validation error
    errCode = 400 // bad request
    const keys = Object.keys(err.errors);
    // report the first validation error
    errMessage = err.errors[keys[0]].message
  } else {
    // generic or custom error
    errCode = err.status || 500
    errMessage = err.message || 'Internal Server Error'
  }
  res.status(errCode).type('txt')
    .send(errMessage);
});


app.get('/health', (req, res) => {
  res.json({status: 'UP'})
  .status(200);
});

async function createUser(username, res) {
  console.log("triggerd createUser: from api endpoint");
  let newUser = await dbInserts.createUser(username);
  res.json({
    _id: newUser._id,
    username: newUser.username
  });
}


async function getAllUsersNames(res){
  let users = await dbFinds.find(null, 'username');
  console.log("users: ", users);
  res.json(users);
}

app.post('/api/exercise/new-user', (req, res) => {
  createUser(req.body.username, res);
  console.log(req.body.username);
});


app.get('/api/exercise/users', (req, res) => {
  getAllUsersNames(res);
});

// api/exercise/users

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port );
});
