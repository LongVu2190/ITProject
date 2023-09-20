'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');
const bcrypt = require('bcrypt');

function timeDifference(time1, time2) {
    // Convert both times to milliseconds
    var time1 = new Date("1970-01-01 " + time1);
    var time2 = new Date("1970-01-01 " + time2);

    // Calculate the difference in milliseconds
    var diff = Math.abs(time2 - time1);

    // Convert back to hours and minutes
    var hours = Math.floor(diff / 3600000); // 1 Hour = 36000 Milliseconds
    var minutes = Math.floor((diff % 3600000) / 60000); // 1 Minutes = 60000 Milliseconds

    return hours + ":" + minutes;
}

const addMovie = async (eventdata) => {
    try {
        // Kết nối tới SQL Server
        let pool = await sql.connect(config.sql);

        // Lấy hết queries trong thư mục queries
        const sqlQueries = await utils.loadSqlQueries('queries');

        // Insert dữ liệu và thực thi query
        const insertEvent = await pool.request()
                            .input('Movie_ID', sql.NVarChar, eventdata.Movie_ID)
                            .input('Movie_Title', sql.NVarChar, eventdata.Movie_Title)
                            .input('Movie_Cost', sql.Int, eventdata.Movie_Cost)
                            .input('Genre', sql.NVarChar, eventdata.Genre)
                            .input('Thumbnail', sql.NVarChar, eventdata.Thumbnail)
                            .query(sqlQueries.addMovie);   
                            
        return insertEvent.recordset;
    } catch (error) {
        return error;
    }
}

const addUser = async (eventdata) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('queries');

        const hashPass = await bcrypt.hash(eventdata.Password, parseInt(process.env.SALT_ROUNDS));

        const insertEvent = await pool.request()
                            .input('UserName', sql.NVarChar, eventdata.UserName)
                            .input('Password', sql.NVarChar, hashPass)
                            .input('NickName', sql.NVarChar, eventdata.NickName)
                            .input('Email', sql.NVarChar, eventdata.Email)
                            .query(sqlQueries.addUser);   
                            
        return insertEvent.recordset;
    } catch (error) {
        return error;
    }
}

const addShowTime = async (eventdata) => {
    try {
        let pool = await sql.connect(config.sql);

        const sqlQueries = await utils.loadSqlQueries('queries');

        console.log(timeDifference(eventdata.Start_Time, eventdata.End_Time));

        const insertEvent = await pool.request()
                            .input('ShowTime_ID', sql.NVarChar, eventdata.ShowTime_ID)
                            .input('Movie_ID', sql.NVarChar, eventdata.Movie_ID)
                            .input('Date', sql.Date, eventdata.Date)
                            .input('Start_Time', sql.NVarChar, eventdata.Start_Time)
                            .input('End_Time', sql.NVarChar, eventdata.End_Time)
                            .input('Run_Time', sql.NVarChar, timeDifference(eventdata.Start_Time, eventdata.End_Time))
                            .query(sqlQueries.addShowTime);   
       
        return insertEvent.recordset;
    } catch (error) {
        return error;
    }
}

const addTicket = async (eventdata) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('queries');

        const insertEvent = await pool.request()
                            .input('UserName', sql.NVarChar, eventdata.UserName)
                            .input('ShowTime_ID', sql.NVarChar, eventdata.ShowTime_ID)
                            .input('Seat_Number', sql.Int, eventdata.Seat_Number)
                            .query(sqlQueries.addTicket);   
                            
        return insertEvent.recordset;
    } catch (error) {
        return error;
    }
}

const addComment = async (eventdata) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('queries');

        const insertEvent = await pool.request()
                            .input('Ticket_ID', sql.NVarChar, eventdata.Ticket_ID)
                            .input('Rating_Point', sql.Int, eventdata.Rating_Point)
                            .input('Comment', sql.NVarChar, eventdata.Comment)
                            .query(sqlQueries.addComment);   
                            
        return insertEvent.recordset;
    } catch (error) {
        return error;
    }
}
module.exports = {
    addMovie,
    addShowTime,
    addUser,
    addTicket,
    addComment
}