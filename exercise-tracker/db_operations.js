// B"H
const mongo = require("mongodb");
const mongoose = require("mongoose");
// const randomString = require(`${__dirname}/random_string.js`);
require("dotenv").config();

const uri = process.env.MONGO_URI;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(error => {
    console.log(error);
  });
let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("we're connected!");
});

// Set mongo options
mongoose.set("useFindAndModify", false);
mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);


// userId(_id), description, duration, date
/** # SCHEMAS and MODELS #
/*  ====================== */
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Must have unique user name"],
    unique: true
  },
  exercises: [
    {
      description: {
        type: String,
        required: [true, "must provide exercise description"],
      },
      duration: {
        type: Number,
        required: [true, "must provide exercise duration"],
      },
      date: {
        type: Date,
        required: [true, "must provide exercise date"],
      }
    }
  ]
});

let UserModal = mongoose.model("users", userSchema);

function returnPromiseResaults(res){
  return res;
}


function handleErrors(err){
  throw err;
}


exports.UserModal = UserModal;
exports.handleErrors = handleErrors;
exports.returnPromiseResaults = returnPromiseResaults;
