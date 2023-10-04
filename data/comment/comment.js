import utils from '../utils.js';
import config from '../../config/config.js';
import sql from 'mssql';

const addComment = async (data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('comment/sql');

        const commentId = utils.generateRandomID();

        const insertComment = await pool.request()
                            .input('commentId', sql.NVarChar, commentId)
                            .input('ticketId', sql.NVarChar, data.ticketId)
                            .input('ratingPoint', sql.Int, data.ratingPoint)
                            .input('comment', sql.NVarChar, data.comment)
                            .query(sqlQueries.addComment);   
        
        console.log('Added comment ID: ' + commentId);                    
        return {
            message: "Comment successfully",
            ...insertComment.recordset[0]
        }
    } catch (error) {
        return error.message;
    }
}

const deleteComment = async (data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('comment/sql');

        await pool.request()
                            .input('commentId', sql.NVarChar, data.commentId)
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
                            .input('movieId', sql.NVarChar, movieId)
                            .query(sqlQueries.getCommentByMovie);

        return comments.recordset;

    } catch (error) {
        return error.message;
    }
}

export default {
    addComment,
    deleteComment,
    getCommentByMovie
}