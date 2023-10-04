import utils from "../utils.js";
import config from "../../config/config.js";
import sql from "mssql";
import users from "../user/user.js";
import st from "../showTime/showTime.js";

async function checkSeats(ShowTime_ID, seat, checkSeat) {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries("ticket/sql");

        const availableSeat = await pool
            .request()
            .input("ShowTime_ID", sql.NVarChar, ShowTime_ID)
            .input("Seat_Number", sql.Int, seat)
            .query(sqlQueries.checkAvailableSeat);

        if ((await availableSeat.recordset[0]) != null) {
            checkSeat.value = false;
        }
    } catch (error) {
        return error;
    }
}

async function addTicket(Account_ID, ShowTime_ID, seat) {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries("ticket/sql");

        const Ticket_ID = utils.generateRandomID();

        await pool
            .request()
            .input("Ticket_ID", sql.NVarChar, Ticket_ID)
            .input("Account_ID", sql.NVarChar, Account_ID)
            .input("ShowTime_ID", sql.NVarChar, ShowTime_ID)
            .input("Seat_Number", sql.Int, seat)
            .query(sqlQueries.addTicket);

        console.log("Bought succesfully ticket: " + Ticket_ID);
    } catch (error) {
        return error;
    }
}

const buyTickets = async (data) => {
    try {
        const userBalance = await users.getBalance(data);
        const cost = await st.getCostOfShowTime(data);

        // Check balance of user
        if (userBalance.Balance < cost.Cost * data.seatNumber.length) {
            return {
                message: "Your balance is not enough",
            };
        }

        // Check if seats are available
        var checkSeat = { value: true };

        for (const seat of data.seatNumber) {
            await checkSeats(data.showTimeId, seat, checkSeat);
        }

        if (!checkSeat.value) {
            return {
                message: "Your chosen seats are not available now",
            };
        }
        console.log("Checked no seats are duplicated");

        // Add ticket
        for (const seat of data.seatNumber) {
            await addTicket(data.accountId, data.showTimeId, seat);
        }

        const boughtUser = await users.reduceBalance({
            Account_ID: data.accountId,
            Cost: cost.Cost * data.seatNumber.length,
        });

        return {
            message: "Bought tickets successfully",
            data: boughtUser
        };

    } catch (error) {
        return error;
    }
};

export default {
    buyTickets
};
