'use strict';

const express = require('express');
const eventController = require('../controllers/eventController');
const router = express.Router();

router.get('/events', eventController.getAllEvents);
router.get('/event/:id', eventController.getEventByID);

// insert
router.post('/event', eventController.addEvent);
router.post('/movie', eventController.addMovie);

// update
router.patch('/event/:id', eventController.updateEvent);

// delete
router.delete('/event/:id', eventController.deleteEvent);

module.exports = {
    routes: router
}