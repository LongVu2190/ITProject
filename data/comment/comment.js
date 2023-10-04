import utils from '../utils.js';
import config from '../../config/config.js';
import sql from 'mssql';

const addComment = async (data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('comment/sql');

        const commentId = utils.generateRandomID();

        const insertComment = await pool.request()
                            .input('Comment_ID', sql.NVarChar, commentId)
                            .input('Ticket_ID', sql.NVarChar, data.ticketId)
                            .input('Rating_Point', sql.Int, data.ratingPoint)
                            .input('Comment', sql.NVarChar, data.comment)
                            .query(sqlQueries.addComment);   
        
        console.log('Added comment ID: ' + commentId);                    
        return insertComment.recordset;
    } catch (error) {
        return error;
    }
}

const deleteComment = async (data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('comment/sql');

        const comment = await pool.request()
                            .input('Comment_ID', sql.NVarChar, data.commentID)
                            .query(sqlQueries.deleteComment);

        console.log('Deleted comment ID: ' + data.commentID);

        return {
            message: "Delete successfully",
        };
    } catch (error) {
        return error.message;
    }
}

const getCommentByMovie = async(movieId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('comment/sql');

        const comments = await pool.request()
                            .input('Movie_ID', sql.NVarChar, movieId)
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