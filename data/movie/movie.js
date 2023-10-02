import utils from '../utils.js';
import config from '../../config/config.js';
import sql from 'mssql';

const addMovie = async (data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('movie/sql');

        const Movie_ID = utils.generateRandomID();
        const insertEvent = await pool.request()
                            .input('Movie_ID', sql.NVarChar, Movie_ID)
                            .input('Title', sql.NVarChar, data.Title)
                            .input('Cost', sql.Int, data.Cost)
                            .input('Genre', sql.NVarChar, data.Genre)
                            .input('Region', sql.NVarChar, data.Region)
                            .input('Run_Time', sql.NVarChar, data.Run_Time)
                            .input('Thumbnail', sql.NVarChar, data.Thumbnail)
                            .query(sqlQueries.addMovie);   
                       
        console.log("Added movie: " + insertEvent.recordset);
        return insertEvent.recordset;
    } catch (error) {
        return error.message;
    }
}

export default {
    addMovie,
}