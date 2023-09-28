import utils from '../utils.js';
import config from '../../config.js';
import sql from 'mssql';

const addShowTime = async (data) => {
    try {
        let pool = await sql.connect(config.sql);

        const sqlQueries = await utils.loadSqlQueries('showTime/sql');

        const ShowTime_ID = utils.generateRandomID();
            
        const insertEvent = await pool.request()
                            .input('ShowTime_ID', sql.NVarChar, ShowTime_ID)
                            .input('Movie_ID', sql.NVarChar, data.Movie_ID)
                            .input('Date', sql.NVarChar, data.Date)
                            .input('Start_Time', sql.NVarChar, data.Start_Time)
                            .query(sqlQueries.addShowTime);   
       
        console.log("Added showtime: " + insertEvent.recordset);
        return insertEvent.recordset;
    } catch (error) {
        return error.message;
    }
}

const getComingShowTime = async() => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('showTime/sql');

        const event = await pool.request().query(sqlQueries.getComingShowTime);

        return event.recordset;
    } catch (error) {
        return error.message;
    }
}

const getTodayShowTime = async() => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('showTime/sql');

        const event = await pool.request().query(sqlQueries.getTodayShowTime);

        return event.recordset;
    } catch (error) {
        return error.message;
    }
}

const getSeatsOfShowTime = async (data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries("ticket/sql");

        const ticket = await pool
            .request()
            .input("ShowTime_ID", sql.NVarChar, data.ShowTime_ID)
            .query(sqlQueries.getSeatsOfShowTime);

        return ticket.recordset;
    } catch (error) {
        return error;
    }
};


const getCostOfShowTime = async(data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('showTime/sql');

        const cost = await pool.request()
                                .input('ShowTime_ID', sql.NVarChar, data.ShowTime_ID)
                                .query(sqlQueries.getCostOfShowTime);

        return cost.recordset[0];
    } catch (error) {
        return error.message;
    }
}

export default {
    addShowTime,
    getTodayShowTime,
    getComingShowTime,
    getCostOfShowTime,
    getSeatsOfShowTime
}