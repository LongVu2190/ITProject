import utils from '../../utils.js';
import config from '../../../config.js';
import sql from 'mssql';

const addComment = async (data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('comment');

        const insertEvent = await pool.request()
                            .input('Ticket_ID', sql.NVarChar, data.Ticket_ID)
                            .input('Rating_Point', sql.Int, data.Rating_Point)
                            .input('Comment', sql.NVarChar, data.Comment)
                            .query(sqlQueries.addComment);   
                            
        return insertEvent.recordset;
    } catch (error) {
        return error;
    }
}

export default {
    addComment
}