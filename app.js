const createError = require('http-errors');
const express = require('express');
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

const app = express();
const router = express.Router();
app.use(express.json());

//////////////////////
// Dish Interactions
////
router.get('/', readHelloMessage);
router.get('/diningfood', readDiningFoods);
router.get('/diningfood/:foodname', readDiningFood);
router.post('/diningfood', createDiningFood);
router.put('/diningfood/:id', updateDiningFood);
router.delete('/diningfood/:id', deleteDiningFood);
//////////////////////
// User Interactions
////

//////////////////////

app.use(router);

// Implement the CRUD operations.
function returnDataOr404(res, data) {
  if (data == null) {
    res.sendStatus(404);
  } else {
    res.send(data);
  }
}

const generateSQLFilter = params => {
  let filterString = "";
  for (let key in params) {
    filterString += `${key}='${params[key]}' AND `;
  }
  filterString = filterString.slice(0, -5); // take off last AND
  return filterString;
};

function readHelloMessage(req, res) {
  res.send('This is the KnightBites REST API! Usage: WIP');
}

function readDiningFoods(req, res, next) {
  db.many(`SELECT * FROM diningfood ${(Object.keys(req.query).length) ? 'WHERE ' + generateSQLFilter(req.query) : ''}`)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
}

function readDiningFood(req, res, next) {
  db.oneOrNone('SELECT * FROM diningfood WHERE foodname=${foodname}', req.params)
    .then((data) => {
      returnDataOr404(res, data);
    })
    .catch((err) => {
      next(err);
    });
}

function updateDiningFood(req, res, next) {
  db.oneOrNone('UPDATE diningfood \
                SET FoodName=${body.foodname}, DiningHall=${body.dininghall} \
                MealTime=${body.mealtime}, Vegan=${body.vegan} \
                Vegetarian=${body.vegetarian}, Halal=${body.halal} \
                WHERE id=${params.id} RETURNING id', req)
    .then((data) => {
      returnDataOr404(res, data);
    })
    .catch((err) => {
      next(err);
    });
}

function createDiningFood(req, res, next) {
  db.one('INSERT INTO diningfood(foodname, dininghall, mealtime, vegan, vegetarian, halal) \
          VALUES (${foodname}, ${dininghall}, ${mealtime}, ${vegan}, ${vegatarian}, ${halal}) \
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

module.exports = app;
