const express = require("express");
const router = express.Router();
const Ninja = require("../models/ninja");

//get list of ninjas from the db
router.get("/ninjas", function (req, res, next) {
  // Ninja.find({}).then(function(ninjas){ res.send(ninjas);});  //finds all the ninjas available
  Ninja.geoNear(
    {
      type: "point",
      coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
    },
    { maxDistance: 100000, spherical: true }
  ).then(function (ninjas) {
    res.send(ninjas);
  });
});

//add
router.post("/ninjas", function (req, res, next) {
  //   var ninja = new Ninja(req.body);
  //   ninja.save();
  Ninja.create(req.body)
    .then(function (ninja) {
      res.send(ninja);
    })
    .catch(next);
});

//update
router.put("/ninjas/:id", function (req, res, next) {
  Ninja.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function () {
    Ninja.findOne({ _id: req.params.id }).then(function (ninja) {
      res.send(ninja);
    });
  });
});

//delete
router.delete("/ninjas/:id", function (req, res, next) {
  // console.log(req.params.id);
  Ninja.findByIdAndRemove({ _id: req.params.id })
    .then(function (ninja) {
      res.send(ninja);
    })
    .catch(next);
});

module.exports = router;
