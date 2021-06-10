// B"H
const express = require("express");
const cors = require("cors");
const dbInserts = require(`${__dirname}/db_inserts.js`);
const dbFinds = require(`${__dirname}/db_finds.js`);
const bodyParser = require("body-parser");
const dns = require("dns");
const url = require("url");
require("dotenv").config();
const app = express();

// Basic Configuration
let port = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static(process.cwd() + "/public"));
app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});


// health endpoint.
app.get("/api/health", function (req, res) {
  res.json({ status: "Ok" });
});

async function getNewUrl(req, res) {
  let urls = await dbInserts.genrateShortUrl(req.body.url, 0);
  res.json({
    original_url: urls.original_url,
    short_url: urls.short_url
  });
}


async function returnNewUrl(req, res) {

  let protocol = url.parse(req.body.url).protocol;
  let validProtocol = protocol == "http:" || protocol == "https:" ? true : false;

  dns.lookup(url.parse(req.body.url).hostname, err => {
    if (err || !validProtocol) {
      res.json({ error: "invalid URL" });
    } else {
      getNewUrl(req, res);
    }
  });
}


async function redirectToOrginalUrl(res, shortUrl) {
  let orginalUrl = await dbFinds.getOrginalUrl(shortUrl);
  console.log("after call to getOrginalUrl orginalUrl: ", orginalUrl);
  try {
    res.redirect(301, orginalUrl);
  } catch (error) {
    console.log(err);
  }

}


app.post("/api/shorturl/new", function (req, res) {
  console.log(req.body.url);
  returnNewUrl(req, res);
});


app.get("/api/shorturl/:shortUrl", function (req, res) {
  console.log("user get input: ", req.params.shortUrl);
  redirectToOrginalUrl(res, req.params.shortUrl);
});


app.listen(port, function () {
  console.log("Node.js listening ...");
});
