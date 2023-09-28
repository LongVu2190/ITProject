import utils from '../../utils.js';
import config from '../../../config.js';
import sql from 'mssql';
import users from '../user/user.js'
import costs from '../showTime/showTime.js'

const availableSeat = async (ShowTime_ID, Seat_Number) => {
    
}
const addTicket = async (data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('ticket');

        const ShowTime_ID = data.ShowTime_ID;

        const userBalance = await users.getBalance(data.Account_ID);

        const cost = await costs.getCostOfShowTime(data.ShowTime_ID);

        // Check balance of user
        if (userBalance.Balance < cost.Cost * data.Seat_Number.length) {
            return {
                message: "Not enough balance"
            }
        }

        // Check if seats are available
        
        const checkSeat = true;

        data.Seat_Number.forEach(async (seat) => {
            console.log(ShowTime_ID);
            console.log(seat);
            try {
                let pool = await sql.connect(config.sql);
                const sqlQueries = await utils.loadSqlQueries('ticket');
        
                const availableSeat = await pool.request()
                                            .input('ShowTime_ID', sql.NVarChar, ShowTime_ID)
                                            .input('Seat_Number', sql.Int, seat)
                                            .query(sqlQueries.checkAvailableSeat); 
        
                console.log(availableSeat.recordset[0].Seat_Number != null);

                if (availableSeat.recordset[0].Seat_Number != null) {
                    checkSeat = false;
                }
            } catch (error) {
                return error;
            }
        });

        if (checkSeat) {
            return {
                message: "Not available seat"
            };
        }


        // Add ticket
        const Ticket_ID = utils.generateRandomID();

        const insertTicket = await pool.request()
                            .input('Ticket_ID', sql.NVarChar, Ticket_ID)
                            .input('Account_ID', sql.NVarChar, data.Account_ID)
                            .input('ShowTime_ID', sql.NVarChar, data.ShowTime_ID)
                            .input('Seat_Number', sql.Int, data.Seat_Number)
                            .query(sqlQueries.addTicket);   
               
        const user = {
            Account_ID: data.Account_ID,
            Balance: 30000
        }

        users.updateBalance(user);

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