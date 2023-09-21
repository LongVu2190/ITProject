import utils from '../../utils.js';
import config from '../../../config.js';
import sql from 'mssql';

const addTicket = async (data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('ticket');

        const ID = utils.generateRandomID();

        const insertEvent = await pool.request()
                            .input('ID', sql.NVarChar, ID)
                            .input('UserName', sql.NVarChar, data.UserName)
                            .input('ShowTime_ID', sql.NVarChar, data.ShowTime_ID)
                            .input('Seat_Number', sql.Int, data.Seat_Number)
                            .query(sqlQueries.addTicket);   
                            
        return insertEvent.recordset;
    } catch (error) {
        return error;
    }
}

export default {
    addTicket
}