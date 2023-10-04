import utils from '../utils.js';
import config from '../../config/config.js';
import sql from 'mssql';

const addMovie = async (data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('movie/sql');

        const Movie_ID = utils.generateRandomID();
        const insertEvent = await pool.request()
                            .input('Movie_ID', sql.NVarChar, movieId)
                            .input('Title', sql.NVarChar, data.title)
                            .input('Cost', sql.Int, data.cost)
                            .input('Genre', sql.NVarChar, data.genre)
                            .input('Region', sql.NVarChar, data.region)
                            .input('Run_Time', sql.NVarChar, data.runTime)
                            .input('Thumbnail', sql.NVarChar, data.thumbnail)
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