// B"H
const mongo = require("mongodb");
const mongoose = require("mongoose");
const randomString = require(`${__dirname}/random_string.js`);
require("dotenv").config();

const uri = process.env.MONGO_URI;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(error => {
    console.log(error);
  });
let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("we're connected!");
});

// Set mongo options
mongoose.set("useFindAndModify", false);
mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);

/** # SCHEMAS and MODELS #
/*  ====================== */
const Schema = mongoose.Schema;

const shortenSchema = new Schema({
  original_url: {
    type: String,
    required: [true, "Must have orginal url"]
  },
  short_url: {
    type: String,
    required: [true, "The short url"],
    unique: true
  },
  description: String
});

let ShortenUrls = mongoose.model("ShortenUrls", shortenSchema);


exports.ShortenUrlsModel = ShortenUrls;
