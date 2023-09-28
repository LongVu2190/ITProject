import utils from '../utils.js';
import config from '../../config.js';
import sql from 'mssql';

const addComment = async (data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('comment/sql');

        const Comment_ID = utils.generateRandomID();

        const insertComment = await pool.request()
                            .input('Comment_ID', sql.NVarChar, Comment_ID)
                            .input('Ticket_ID', sql.NVarChar, data.Ticket_ID)
                            .input('Rating_Point', sql.Int, data.Rating_Point)
                            .input('Comment', sql.NVarChar, data.Comment)
                            .query(sqlQueries.addComment);   
        
        console.log('Added comment ID: ' + Comment_ID);                    
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
                            .input('Comment_ID', sql.NVarChar, data.Comment_ID)
                            .query(sqlQueries.deleteComment);

        console.log('Deleted comment ID: ' + data.Comment_ID);

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
        const sqlQueries = await utils.loadSqlQueries('comment/sql');

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