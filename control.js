const pgp = require('pg-promise')();

const verifyEnv = (env, successMsg, errorMsg) => {
  if (env === undefined) {
    console.log(errorMsg);
    process.exit(-1);
  } else {
    console.log(successMsg);
    return env;
  }
};

const db = pgp({
  host: verifyEnv(process.env.DB_HOST, "Found DB_HOST", "Couldn't find DB_HOST"),
  // Port don't work so good w/ Azure port
  database: verifyEnv(process.env.DB_DATABASE, "Found DB_DATABASE", "Couldn't find DB_DATABASE"),
  user: verifyEnv(process.env.DB_USER, "Found DB_USER", "Couldn't find DB_USER"),
  password: verifyEnv(process.env.DB_PASSWORD, "Found DB_PASSWORD", "Couldn't find DB_PASSWORD"),
  ssl: {rejectUnauthorized: false},
});


// Implement the CRUD operations.
function returnDataOr404(res, data) {
  if (data == null) {
    res.sendStatus(404);
  } else {
    res.send(data);
  }
}

module.exports = { db, returnDataOr404 };

