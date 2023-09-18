'use strict';

const eventData = require('../data/queries');

//Hàm xử lý sự kiện để lấy danh sách tất cả các sự kiện. 
const getAllEvents = async (req, res, next) => {
    try {
        const eventlist = await eventData.allEvents();
        res.send(eventlist);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getEventByID = async (req, res, next) => {
    try {
        const eventID = req.params.id;
        const event = await eventData.eventByID(eventID);
        res.send(event);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addEvent = async (req, res, next) => {
    try {
        const data = req.query;
        console.log(data);
        const insert = await eventData.addEvent(data);
        
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateEvent = async (req, res, next) => {
    try {
        const EventID = req.params.id;
        const data = req.body;
        console.log(req);
        const updated = await eventData.updateEvent(EventID, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteEvent = async (req, res, next) => {
    try {
        const eventID = req.params.id;
        const deletedEvent = await eventData.deleteEvent(eventID);
        res.send(deletedEvent);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
module.exports = {
    getAllEvents,
    getEventByID,
    addEvent,
    updateEvent,
    deleteEvent
}