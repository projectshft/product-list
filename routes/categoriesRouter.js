const express = require("express");
const router = express.Router();
const Product = require("../models/product");

router.get("/", (req, res) => {
  Product.find()
    .distinct("category")
    .exec((err, categories) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(categories);
      }
    });
});

module.exports = router;
