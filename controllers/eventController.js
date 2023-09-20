'use strict';

const eventData = require('../data/queries');

const addMovie = async (req, res, next) => {
    try {
        const data = req.query;
        const insert = await eventData.addMovie(data);
        
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addUser = async (req, res, next) => {
    try {
        const data = req.query;
        const insert = await eventData.addUser(data);
        
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addShowTime = async (req, res, next) => {
    try {
        const data = req.query;
        const insert = await eventData.addShowTime(data);
        
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addTicket = async (req, res, next) => {
    try {
        const data = req.query;
        const insert = await eventData.addTicket(data);
        
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addComment = async (req, res, next) => {
    try {
        const data = req.query;
        const insert = await eventData.addComment(data);
        
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addMovie,
    addShowTime,
    addUser,
    addTicket,
    addComment
}