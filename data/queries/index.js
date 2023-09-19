'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');
const bcrypt = require('bcrypt');

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
    addMovie,
    addShowTime
}