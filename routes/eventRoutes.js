'use strict';

const express = require('express');
const eventController = require('../controllers/eventController');
const router = express.Router();

// Insert
router.post('/addmovie/', eventController.addMovie);
router.post('/addshowtime/', eventController.addShowTime);

module.exports = {
    routes: router
}