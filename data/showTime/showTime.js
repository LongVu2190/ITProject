import utils from '../utils.js';
import config from '../../config/config.js';
import sql from 'mssql';

const addShowTime = async (data) => {
    try {
        let pool = await sql.connect(config.sql);

        const sqlQueries = await utils.loadSqlQueries('showTime/sql');

        const showTimeId = utils.generateRandomID();
            
        const insertShowTime = await pool.request()
                            .input('showTimeId', sql.NVarChar, showTimeId)
                            .input('movieId', sql.NVarChar, data.movieId)
                            .input('showingDate', sql.NVarChar, data.showingDate)
                            .input('startTime', sql.NVarChar, data.startTime)
                            .query(sqlQueries.addShowTime);   
       
        console.log("Added showtime: " + insertShowTime.recordset[0]);

        return {
            message: "Add showtime successfully",
            ...insertShowTime.recordset[0]
        }
    } catch (error) {
        if (error.number == 2601) {
            return {
                message: "Showtime with this movieId already exist in this DateTime"
            }
        } else return { message: error.message };
    }
}

const getComingShowTime = async() => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('showTime/sql');

        const showTimes = await pool.request().query(sqlQueries.getComingShowTime);

        if (showTimes.recordset == "") {
            return {
                message: "No coming showtime",
            }
        }
        return showTimes.recordset;
    } catch (error) {
        return { message: error.message }
    }
}

const getNowShowTime = async() => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('showTime/sql');

        const showTimes = await pool.request().query(sqlQueries.getNowShowTime);

        if (showTimes.recordset == "") {
            return {
                message: "No show time today",
            }
        }
        return showTimes.recordset;
    } catch (error) {
        return { message: error.message }
    }
}

const getAllShowTime = async() => {
    try {
        let pool = await sql.connect(config.sql);

        const showTimes = await pool.request().query('select * from ShowTime_List');

        return showTimes.recordset;
    } catch (error) {
        return { message: error.message }
    }
}

const getTimes = async(data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('showTime/sql');

        const times = await pool.request()
                                .input('movieId', sql.NVarChar, data.movieId)
                                .query(sqlQueries.getTimes);

        return times.recordset;
    } catch (error) {
        return { message: error.message }
    }
}

const getSeatsOfShowTime = async (showTimeId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries("showTime/sql");
        const seats = await pool
            .request()
            .input("showTimeId", sql.NVarChar, showTimeId)
            .query(sqlQueries.getSeatsOfShowTime);

        const showTimeSeats = seats.recordset.map(item => item.seatNumber);

        return showTimeSeats;
    } catch (error) {
        return { message: error.message }
    }
}

const getCostOfShowTime = async(showTimeId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('showTime/sql');

        const showTime = await pool.request()
                                .input('showTimeId', sql.NVarChar, showTimeId)
                                .query(sqlQueries.getCostOfShowTime);

        return showTime.recordset[0].cost;
    } catch (error) {
        return { message: error.message }
    }
}

export default {
    addShowTime,
    getNowShowTime,
    getComingShowTime,
    getAllShowTime,
    getCostOfShowTime,
    getSeatsOfShowTime,
    getTimes
}