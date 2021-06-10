// B"H
const db = require(`${__dirname}/db_operations.js`);


// TODO Fix error when url missing http/s prefix
async function getOrginalUrl(shortUrl) {
  console.log("getOrginalUrl shortUrl param: ", shortUrl);
  let orginalUrl;
  await db.ShortenUrlsModel.findOne({ short_url: shortUrl })
    .exec()
    .then(url => {
      console.log("url object in find: ", url);
      orginalUrl = url.original_url;
      console.log("orginal url in find: ", url.original_url);
      // console.log("orginalUrl in find: ", originalUrl);
    })
    .catch(err => {
      throw err;
    });

  console.log(orginalUrl);
  return orginalUrl;
}

// Execute exampale.
// (async () => {
//   let exampaleUrl = "gvptu";
//   console.log(await getOrginalUrl(exampaleUrl));
// })();

exports.getOrginalUrl = getOrginalUrl;
