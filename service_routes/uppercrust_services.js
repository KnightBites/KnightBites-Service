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

module.exports = { getUppercrustIngredients };

