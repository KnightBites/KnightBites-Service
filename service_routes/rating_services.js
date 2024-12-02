const { db, returnDataOr404 } = require("../control.js");

function getRating(req, res, next) {
  db.one("SELECT AVG(userrating) FROM diningfoodratings WHERE foodid = ${id}", req.params)
    .then(
      data => res.send(data)
    )
    .catch(
      err => next(err)
    );
}

function updateRating(req, res, next) {
  db.oneOrNone("UPDATE diningfoodratings \
                SET userrating=${body.userrating}, usercomment=${body.usercomment}, date=${body.date}\
                WHERE userid=${params.userid} AND foodid=${params.foodid}\
                RETURNING userid", req)
    .then((data) => {
      returnDataOr404(res, data);
    })
    .catch((err) => {
      next(err);
    });
}

function createRating(req, res, next) {
  db.one('INSERT INTO diningfoodratings(userid, foodid, userrating, usercomment, date) \
          VALUES (${userid}, ${foodid}, ${userrating}, ${usercomment}, ${date}) \
          RETURNING id', req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { getRating, updateRating, createRating };

