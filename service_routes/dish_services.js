const { db, returnDataOr404 } = require("../control.js");

const generateSQLFilter = params => {
  let filterString = "";
  for (let key in params) {
    filterString += `${key}='${params[key]}' AND `;
  }
  filterString = filterString.slice(0, -5); // take off last AND
  return filterString;
};

function readDiningFoods(req, res, next) {
  db.many(`SELECT diningfood.*, AVG(diningfoodratings.userrating) FROM diningfood 
           LEFT JOIN diningfoodratings ON diningfood.id = diningfoodratings.foodid
           ${(Object.keys(req.query).length) ? 'WHERE ' + generateSQLFilter(req.query) : ''} 
           GROUP BY diningfood.id`)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
}

function readDiningFood(req, res, next) {
  db.oneOrNone('SELECT * FROM diningfood WHERE id=${id}', req.params)
    .then((data) => {
      returnDataOr404(res, data);
    })
    .catch((err) => {
      next(err);
    });
}

function updateDiningFood(req, res, next) {
  db.oneOrNone('UPDATE diningfood \
                SET FoodName=${body.foodname}, DiningHall=${body.dininghall}, \
                Breakfast=${body.breakfast}, Lunch=${body.lunch}, \
                Dinner=${body.dinner}, \
                MealTime=${body.mealtime}, Vegan=${body.vegan}, \
                Vegetarian=${body.vegetarian}, Halal=${body.halal}, \
                Description=${body.description} \
                WHERE id=${params.id} RETURNING id', req)
    .then((data) => {
      returnDataOr404(res, data);
    })
    .catch((err) => {
      next(err);
    });
}

function createDiningFood(req, res, next) {
  db.one('INSERT INTO diningfood(foodname, dininghall, breakfast, lunch, dinner, mealtime, vegan, vegetarian, halal, description) \
          VALUES (${foodname}, ${dininghall}, ${breakfast}, ${lunch}, ${dinner}, ${mealtime}, ${vegan}, ${vegatarian}, ${halal}, ${description}) \
          RETURNING id', req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
}

function deleteDiningFood(req, res, next) {
  db.oneOrNone('DELETE FROM diningfood WHERE id=${id} RETURNING id', req.params)
    .then((data) => {
      returnDataOr404(res, data);
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { readDiningFoods, readDiningFood, updateDiningFood, createDiningFood, deleteDiningFood };

