'use strict';

const express = require('express');
const eventController = require('../controllers/eventController');
const router = express.Router();

router.get('/events', eventController.getAllEvents);
router.get('/event/:id', eventController.getEventByID);

// insert
router.post('/addevent', eventController.addEvent);

// update
router.patch('/event/:id', eventController.updateEvent);

// delete
router.delete('/event/:id', eventController.deleteEvent);

// Project
router.post('/addmovie/', eventController.addMovie);
router.post('/addshowtime/', eventController.addShowTime);

module.exports = {
    routes: router
}