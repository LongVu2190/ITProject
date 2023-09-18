'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const allEvents = async () => {
    try {
        // Kết nối tới SQL Server
        let pool = await sql.connect(config.sql);

        // Lấy hết queries có trong thư mục events
        const sqlQueries = await utils.loadSqlQueries('events');

        // Chạy query allEvents.sql
        const eventsList = await pool.request().query(sqlQueries.allEvents);

        // Trả về json
        return eventsList.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const eventByID = async(eventID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const event = await pool.request()
                            .input('eventID', sql.NVarChar, eventID)
                            .query(sqlQueries.eventByID);
        return event.recordset;
    } catch (error) {
        return error.message;
    }
}

const addEvent = async (eventdata) => {
    try {
        let pool = await sql.connect(config.sql);

        const sqlQueries = await utils.loadSqlQueries('events');

        const insertEvent = await pool.request()
                            .input('EventID', sql.NVarChar, eventdata.EventID)
                            .input('Information', sql.NVarChar, eventdata.Information)
                            .query(sqlQueries.insertEvent);   

        return insertEvent.recordset;
    } catch (error) {
        return error.message;
    }
}

const updateEvent = async (eventID, data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const update = await pool.request()
                        .input('EventID', sql.NVarChar, eventID)
                        .input('Information', sql.NVarChar, data.Information)
                        .query(sqlQueries.updateEvent);
        return update.recordset;
    } catch (error) {
        return error.message;
    }
}

const deleteEvent = async (eventID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const deleteEvent = await pool.request()
                            .input('eventId', sql.NVarChar, eventID)
                            .query(sqlQueries.deleteEvent);
        return deleteEvent.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    allEvents,
    eventByID,
    addEvent,
    updateEvent,
    deleteEvent
}