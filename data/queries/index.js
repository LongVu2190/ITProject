'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const allEvents = async () => {
    try {
        // Kết nối tới SQL Server
        let pool = await sql.connect(config.sql);

        // Lấy hết queries có trong thư mục events
        const sqlQueries = await utils.loadSqlQueries('queries');

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
        const sqlQueries = await utils.loadSqlQueries('queries');
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

        const sqlQueries = await utils.loadSqlQueries('queries');

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
        const sqlQueries = await utils.loadSqlQueries('queries');
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
        const sqlQueries = await utils.loadSqlQueries('queries');
        const deleteEvent = await pool.request()
                            .input('eventId', sql.NVarChar, eventID)
                            .query(sqlQueries.deleteEvent);
        return deleteEvent.recordset;
    } catch (error) {
        return error.message;
    }
}

const addMovie = async (eventdata) => {
    try {
        let pool = await sql.connect(config.sql);

        const sqlQueries = await utils.loadSqlQueries('queries');

        const insertEvent = await pool.request()
                            .input('Movie_ID', sql.NVarChar, eventdata.Movie_ID)
                            .input('Movie_Title', sql.NVarChar, eventdata.Movie_Title)
                            .input('Movie_Cost', sql.Int, eventdata.Movie_Cost)
                            .input('Picture_URL', sql.NVarChar, eventdata.Picture_URL)
                            .query(sqlQueries.addMovie);   

        return insertEvent.recordset;
    } catch (error) {
        return error.message;
    }
}

const addShowTime = async (eventdata) => {
    try {
        let pool = await sql.connect(config.sql);

        const sqlQueries = await utils.loadSqlQueries('queries');

        const insertEvent = await pool.request()
                            .input('ShowTime_ID', sql.NVarChar, eventdata.ShowTime_ID)
                            .input('Movie_ID', sql.NVarChar, eventdata.Movie_ID)
                            .input('Date', sql.Date, eventdata.Date)
                            .input('Start_Time', sql.NVarChar, eventdata.Start_Time)
                            .input('End_Time', sql.NVarChar, eventdata.End_Time)
                            .query(sqlQueries.addShowTime);   

        
        return insertEvent.recordset;
    } catch (error) {
        return error.message;
    }
}
module.exports = {
    allEvents,
    eventByID,
    addEvent,
    updateEvent,
    deleteEvent,

    addMovie,
    addShowTime
}