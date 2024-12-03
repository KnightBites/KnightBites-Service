const welcomeMessage = `
<p><code>GET    /dish           -- read all dishes</code></p>
<p><code>GET    /dish/:id       -- read dish with given id</code></p>
<p><code>POST   /user           -- create new user</code></p>
<p><code>POST   /user/validate  -- validate user login</code></p>
<p><code>PUT    /user/:id       -- update user with given id</code></p>
<p><code>DELETE /user/:id       -- delete user with given id</code></p>
<p><code>GET    /user/:id       -- read user with given id</code></p>
<p><code>GET    /rating/:dishid -- read rating with given dish id</code></p>
<p><code>PUT    /rating/:dishid -- update rating with given dish id</code></p>
<p><code>POST   /rating         -- create a new rating</code></p>
`;

const createError = require('http-errors');
const express = require('express');
const app = express();
const router = express.Router();
app.use(express.json());

//////////////////////
// Dish Interactions
////
const { readDiningFoods, readDiningFood, createDiningFood, updateDiningFood, deleteDiningFood } = require("./service_routes/dish_services.js");
router.get('/dish', readDiningFoods);
router.get('/dish/:id', readDiningFood);
// router.post('/diningfood', createDiningFood);
// router.put('/diningfood/:id', updateDiningFood);
// router.delete('/diningfood/:id', deleteDiningFood);
//////////////////////
// User Profile Interactions
////
const { createUser, updateUser, deleteUser, getUser, validateLogin } = require("./service_routes/user_services.js");
router.post("/user", createUser);
router.post("/user/validate", validateLogin);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);
router.get("/user/:id", getUser);
//////////////////////
// Ratings Interactions
////
const { getRating, updateRating, createRating, getComments } = require("./service_routes/rating_services.js");
router.get("/rating/:dishid", getRating);
router.get("/comments/:dishid", getComments);
router.put("/rating/:dishid", updateRating);
router.post("/rating", createRating);
//////////////////////

router.get('/', readHelloMessage);
app.use(router);

function readHelloMessage(req, res) {
  res.send('This is the KnightBites REST API! Usage:' + welcomeMessage);
}

module.exports = app;

