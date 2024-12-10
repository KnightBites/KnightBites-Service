const { db, returnDataOr404 } = require("../control.js");

function getPrayer(req, res, next) {
  db.many("SELECT * FROM prayers ORDER BY RANDOM() LIMIT 1")
    .then(
      data => res.send(data)
    )
    .catch(
      err => next(err)
    );
}

module.exports = { getPrayer };
