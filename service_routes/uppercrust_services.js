const { db, returnDataOr404 } = require("../control.js");

function getUppercrustIngredients(req, res, next) {
  db.many("SELECT ingredient, category, vegan, vegetarian, halal, image FROM uppercrustdetail, diningfood WHERE ingredient = foodname")
    .then(
      data => res.send(data)
    )
    .catch(
      err => next(err)
    );
}

function postUppercrustCreation(req, res, next) {
  db.one('INSERT INTO uppercrustcreations(creator, sandwichname, comment, date, sammy) \
           VALUES(${creator}, ${sandwichname}, ${comment}, current_timestamp, ${sammy}) \
           RETURNING sandwichname', req.body)
    .then(
      data => res.send(data)
    )
    .catch(
      err => next(err)
    );
}

function getUppercrustCreations(req, res, next) {
  db.many("SELECT * FROM uppercrustcreations")
    .then(
      data => res.send(data)
    )
    .catch(
      err => next(err)
    )
}

module.exports = { getUppercrustIngredients, postUppercrustCreation, getUppercrustCreations };

