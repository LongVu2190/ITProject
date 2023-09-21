import utils from '../../utils.js';
import config from '../../../config.js';
import sql from 'mssql';

const addMovie = async (data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('movie');

        const ID = utils.generateRandomID();
        const insertEvent = await pool.request()
                            .input('ID', sql.NVarChar, ID)
                            .input('Movie_ID', sql.NVarChar, data.Movie_ID)
                            .input('Title', sql.NVarChar, data.Title)
                            .input('Cost', sql.Int, data.Cost)
                            .input('Genre', sql.NVarChar, data.Genre)
                            .input('Thumbnail', sql.NVarChar, data.Thumbnail)
                            .query(sqlQueries.addMovie);   
                            
        return insertEvent.recordset;
    } catch (error) {
        return error;
    }
}

export default {
    addMovie
}