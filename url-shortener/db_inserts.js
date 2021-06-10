// B"H
const db = require(`${__dirname}/db_operations.js`);
const randomString = require(`${__dirname}/random_string.js`);


// ##################################################################
// ##################################################################
// ##################################################################

async function createAndSaveIUrl(orginalUrl, shortUrl, done) {
  let urlObject = new db.ShortenUrlsModel({
    original_url: orginalUrl,
    // short_url: shortUrl //randomString.getRandomString(5)
    short_url: randomString.getRandomString(5)
  });

  let urlsResponse = {
    original_url: urlObject.original_url,
    short_url: urlObject.short_url
  };

  let res = await urlObject.save();
  return res;
}


async function genrateShortUrl(orginalUrl, retry) {
  // let exampleUrl = "wW.google.com";
  // let shortUrl = "/g1";
  let urls;
  
  let res = await createAndSaveIUrl(orginalUrl)
    .then(data => {
      urls = data;
    })
    .catch(err => {
      if (retry < 3) {
        console.log("Duplicate url retrying: " + retry);
        retry++;
        genrateShortUrl(retry);
      }else{
        throw err;
      }
    });

  return urls;
}


// Execute exampale.
// (async () => {
//   console.log(await genrateShortUrl("https://google.com", 0));
// })();



exports.createAndSaveIUrl = createAndSaveIUrl;
exports.genrateShortUrl = genrateShortUrl;