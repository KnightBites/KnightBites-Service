const { db, returnDataOr404 } = require("../control.js");

function createUser(req, res, next) {
  console.log(req.body);
  db.one('INSERT INTO userprofiles(Email, Username, UserPassword, veganRestriction, vegetarianRestriction, halalRestriction) \
          VALUES (${email}, ${username}, ${password}, ${vegan}, ${vegetarian}, ${halal}) \
          RETURNING id', req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
}

function updateUser(req, res, next) {
  db.oneOrNone('UPDATE userprofiles \
                SET Email=${body.email}, Username=${body.username}, \
                UserPassword=${body.password}, veganRestriction=${body.vegan}, \
                vegetarianRestriction=${body.vegetarian}, \
                WHERE id=${params.id} RETURNING id', req)
    .then((data) => {
      returnDataOr404(res, data);
    })
    .catch((err) => {
      next(err);
    });
}

function deleteUser(req, res, next) {
  db.oneOrNone('DELETE FROM userprofiles WHERE id=${id} RETURNING id', req.params)
    .then((data) => {
      returnDataOr404(res, data);
    })
    .catch((err) => {
      next(err);
    });
}

function getUser(req, res, next) {
  db.oneOrNone('SELECT * FROM userprofiles WHERE id=${id}', req.params)
    .then((data) => {
      returnDataOr404(res, data);
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { createUser, updateUser, deleteUser, getUser };

