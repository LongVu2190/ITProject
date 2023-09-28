import utils from '../../utils.js';
import config from '../../../config.js';
import sql from 'mssql';

const addTicket = async (data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('ticket');

        const Ticket_ID = utils.generateRandomID();

        const insertTicket = await pool.request()
                            .input('Ticket_ID', sql.NVarChar, Ticket_ID)
                            .input('Account_ID', sql.NVarChar, data.Account_ID)
                            .input('ShowTime_ID', sql.NVarChar, data.ShowTime_ID)
                            .input('Seat_Number', sql.Int, data.Seat_Number)
                            .query(sqlQueries.addTicket);   
                            
        return insertTicket.recordset;
    } catch (error) {
        return error;
    }
}

const getSeatsOfShowTime = async (ShowTime_ID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('ticket');

        const ticket = await pool.request()
                            .input('ShowTime_ID', sql.NVarChar, ShowTime_ID)
                            .query(sqlQueries.getSeatsOfShowTime);   
                            
        return ticket.recordset;
    } catch (error) {
        return error;
    }
}

export default {
    addTicket,
    getSeatsOfShowTime
}