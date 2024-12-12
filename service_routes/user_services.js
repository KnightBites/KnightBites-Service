const { db, returnDataOr404 } = require("../control.js");

function createUser(req, res, next) {
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

function validateLogin(req, res, next) {
  db.one("SELECT * FROM userprofiles WHERE Username = ${username} AND UserPassword = ${hashedPassword}", req.body)
    .then(data => {
      res.send({userData: {...data}, valid: true});
    })
    .catch(err => {
      console.error(err);
      res.send({valid: false});
    });
}

function updateUser(req, res, next) {
  db.oneOrNone('UPDATE userprofiles \
                SET Email=${body.email}, Username=${body.username}, ' +
               (req.body.hasOwnProperty("password") ? 'UserPassword=${body.password}, ' : '') + 
               'veganRestriction=${body.restrictions.vegan}, \
                vegetarianRestriction=${body.restrictions.vegetarian}, halalRestriction=${body.restrictions.halal}\
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
  db.oneOrNone('SELECT id, email, username, veganrestriction, vegetarianrestriction, halalrestriction FROM userprofiles WHERE id=${id}', req.params)
    .then((data) => {
      returnDataOr404(res, data);
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { createUser, validateLogin, updateUser, deleteUser, getUser };

