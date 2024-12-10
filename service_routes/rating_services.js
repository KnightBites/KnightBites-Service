const { db, returnDataOr404 } = require("../control.js");

function getRating(req, res, next) {
  db.one("SELECT AVG(userrating) FROM diningfoodratings WHERE foodid = ${dishid}", req.params)
    .then(
      data => res.send(data)
    )
    .catch(
      err => next(err)
    );
}

function getComments(req, res, next) {
  db.many("SELECT username, usercomment, date FROM diningfoodratings, userprofiles WHERE userid=userprofiles.id AND foodid=${dishid}", req.params)
    .then(
      data => res.send(data)
    )
    .catch(
      err => next(err)
    );
}

// NOTE: current_timestamp is PSQL's way of putting in the current time
function updateRating(req, res, next) {
  db.oneOrNone("UPDATE diningfoodratings \
                SET userrating=${body.userrating}, usercomment=${body.usercomment}, date=current_timestamp \
                WHERE userid=${body.userid} AND foodid=${params.dishid} \
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
          VALUES (${userid}, ${foodid}, ${userrating}, ${usercomment}, current_timestamp) \
          RETURNING userid', req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { getRating, updateRating, createRating, getComments };

