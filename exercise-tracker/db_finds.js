// B"H
const db = require(`${__dirname}/db_operations.js`);


/**
 * get mongoose find query.
 * mongoose select query.
 */
async function find(query, slectQuery) {
    let res = await db.UserModal.find(query)
      .select(slectQuery)
      .then(res => db.returnPromiseResaults(res))
      .catch(err => db.handleErrors(err));
  
    return res;
  }
  

  exports.find = find;