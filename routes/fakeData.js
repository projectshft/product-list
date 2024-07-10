const router = require('express').Router();
const { addFakeData } = require('../util/helpers');

// A route that adds fake data to the DB
router.get('/', addFakeData);

module.exports = router;