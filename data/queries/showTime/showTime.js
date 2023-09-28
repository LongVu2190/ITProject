import utils from '../../utils.js';
import config from '../../../config.js';
import sql from 'mssql';

const addShowTime = async (data) => {
    try {
        let pool = await sql.connect(config.sql);

        const sqlQueries = await utils.loadSqlQueries('showTime');

        const ShowTime_ID = utils.generateRandomID();
            
        console.log(data.Date);

        const insertEvent = await pool.request()
                            .input('ShowTime_ID', sql.NVarChar, ShowTime_ID)
                            .input('Movie_ID', sql.NVarChar, data.Movie_ID)
                            .input('Date', sql.NVarChar, data.Date)
                            .input('Start_Time', sql.NVarChar, data.Start_Time)
                            .query(sqlQueries.addShowTime);   
       
        return insertEvent.recordset;
    } catch (error) {
        return error.message;
    }
}

const getComingShowTime = async() => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('showTime');

        const event = await pool.request().query(sqlQueries.getComingShowTime);

        return event.recordset;
    } catch (error) {
        return error.message;
    }
}

const getTodayShowTime = async() => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('showTime');

        const event = await pool.request().query(sqlQueries.getTodayShowTime);

        return event.recordset;
    } catch (error) {
        return error.message;
    }
}

export default {
    addShowTime,
    getTodayShowTime,
    getComingShowTime
}