import utils from '../../utils.js';
import config from '../../../config.js';
import sql from 'mssql';

const addComment = async (data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('comment');

        const ID = utils.generateRandomID();

        const insertComment = await pool.request()
                            .input('ID', sql.NVarChar, ID)
                            .input('Ticket_ID', sql.NVarChar, data.Ticket_ID)
                            .input('Rating_Point', sql.Int, data.Rating_Point)
                            .input('Comment', sql.NVarChar, data.Comment)
                            .query(sqlQueries.addComment);   
                            
        return insertComment.recordset;
    } catch (error) {
        return error;
    }
}

export default {
    addComment
}