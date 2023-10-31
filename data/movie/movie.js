import utils from '../utils.js';
import config from '../../config/config.js';
import sql from 'mssql';

const addMovie = async (data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('movie/sql');

        const movieId = utils.generateRandomID();

        const insertMovie = await pool.request()
                            .input('movieId', sql.NVarChar, movieId)
                            .input('Title', sql.NVarChar, data.title)
                            .input('cost', sql.Int, data.cost)
                            .input('genre', sql.NVarChar, data.genre)
                            .input('region', sql.NVarChar, data.region)
                            .input('runTime', sql.NVarChar, data.runTime)
                            .input('thumbnail', sql.NVarChar, data.thumbnail)
                            .query(sqlQueries.addMovie);   
                       
        console.log("Added movie: " + insertMovie.recordset[0]);

        return {
            message: "Add movie successfuly",
            ...insertMovie.recordset[0]
        }
    } catch (error) {
        return { message: error.message }
    }
}

const getAllMovie = async () => {
    try {
        let pool = await sql.connect(config.sql);

        const movies = await pool.request().query('select * from Movie_List');

        return movies.recordset;
    } catch (error) {
        return error.message;
    }
};

export default {
    addMovie,
    getAllMovie,
}