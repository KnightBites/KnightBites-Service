const createError = require('http-errors');
const express = require('express');
const pgp = require('pg-promise')();

const verifyEnv = (env, successMsg, errorMsg) => {
  if (env === undefined) {
    console.log(errorMsg);
    exit(-1);
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

router.get('/', readHelloMessage);
router.get('/diningfood', readDiningFoods);
router.post('/diningfood', createDiningFood);
router.delete('/diningfood/:id', deleteDiningFood);

app.use(router);

// Implement the CRUD operations.
function returnDataOr404(res, data) {
  if (data == null) {
    res.sendStatus(404);
  } else {
    res.send(data);
  }
}

function readHelloMessage(req, res) {
  res.send('This is the KnightBites REST API! Usage: WIP');
}

function readDiningFoods(req, res, next) {
  db.many('SELECT * FROM diningfood')
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

// WIP
function updateDiningFood(req, res, next) {
  db.oneOrNone('UPDATE diningfood SET email=${body.email}, name=${body.name} WHERE id=${params.id} RETURNING id', req)
    .then((data) => {
      returnDataOr404(res, data);
    })
    .catch((err) => {
      next(err);
    });
}

// WIP
function createDiningFood(req, res, next) {
  db.one('INSERT INTO Player(email, name) VALUES (${email}, ${name}) RETURNING id', req.body)
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
