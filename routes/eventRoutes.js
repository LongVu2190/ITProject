'use strict';

const express = require('express');
const eventController = require('../controllers/eventController');
const router = express.Router();

// Insert
router.post('/addmovie/', eventController.addMovie);
router.post('/addshowtime/', eventController.addShowTime);
router.post('/adduser/', eventController.addUser);
router.post('/addticket/', eventController.addTicket);
router.post('/addcomment/', eventController.addComment);

// Get
module.exports = {
    routes: router
}