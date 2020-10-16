var express = require('express');
var router = express.Router();
var burger = require('../models/burger.js');


// Index Page 
router.get("/", function (req, res) {
  burger.selectAll(function (data) {
      var hbsObject = {
          burgers: data
        };
      console.log(hbsObject);
      res.render("index", hbsObject);
  });
});

// Create a New Burger
router.post("/burgers", function (req, res) {
  burger.insertOne([
      "burger_name"
  ], [
      req.body.burger_name
  ], function () {
      res.redirect("/");
  });
});

// Devour a Burger
router.put("/burgers/:id", function (req, res) {
  var condition = "id = " + req.params.id;
  burger.updateOne({
      devoured: true
  }, condition, function (data) {
      res.redirect("/");
  });
});

// Export routes
module.exports = router;