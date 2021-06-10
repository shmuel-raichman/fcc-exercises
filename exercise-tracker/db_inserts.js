// B"H
const db = require(`${__dirname}/db_operations.js`);


// ##################################################################
// ##################################################################
// ##################################################################




async function createUser(name) {
  let user = new db.UserModal({
    username: name
  });

  let res = await user.save()
    .then(res => db.returnPromiseResaults(res))
    .catch(err => db.handleErrors(err));
  return res;
}


// Execute exampale.
// (async () => {
//   let user = await createUser("semi0");
//   console.log(user);
//   console.log(await find(null, 'username'));
// })();



exports.createUser = createUser;
