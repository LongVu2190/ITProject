import utils from '../../utils.js';
import config from '../../../config.js';
import sql from 'mssql';

const addComment = async (data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('comment');

        const Comment_ID = utils.generateRandomID();

        const insertComment = await pool.request()
                            .input('ID', sql.NVarChar, Comment_ID)
                            .input('Ticket_ID', sql.NVarChar, data.Ticket_ID)
                            .input('Rating_Point', sql.Int, data.Rating_Point)
                            .input('Comment', sql.NVarChar, data.Comment)
                            .query(sqlQueries.addComment);   
                            
        return insertComment.recordset;
    } catch (error) {
        return error;
    }
}

const deleteComment = async (ID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('comment');

        const comment = await pool.request()
                            .input('ID', sql.NVarChar, ID)
                            .query(sqlQueries.deleteComment);

        return {
            message: "Delete successfully",
        };
    } catch (error) {
        return error.message;
    }
}

const getCommentByMovie = async(Movie_ID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('comment');

        const comments = await pool.request()
                            .input('Movie_ID', sql.NVarChar, Movie_ID)
                            .query(sqlQueries.getCommentByMovie);

        return comments.recordset;

    } catch (error) {
        return error;
    }
}

export default {
    addComment,
    deleteComment,
    getCommentByMovie
}