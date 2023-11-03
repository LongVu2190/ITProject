import utils from "../utils.js";
import config from "../../config/config.js";
import sql from "mssql";
import users from "../user/user.js";
import st from "../showTime/showTime.js";

async function checkSeats(showTimeId, seatNumber, isSeated) {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries("ticket/sql");

        // Select that seatNumber from database
        const availableSeat = await pool
            .request()
            .input("showTimeId", sql.NVarChar, showTimeId)
            .input("seatNumber", sql.Int, seatNumber)
            .query(sqlQueries.checkAvailableSeat);

        // If that seatNumber exists, value of isSeated -> true
        if ((await availableSeat.recordset[0]) != null) {
            isSeated.value = true;
        }
    } catch (error) {
        return { message: error.message };
    }
}

async function addTicket(accountId, showTimeId, seatNumber) {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries("ticket/sql");

    const ticketId = utils.generateRandomID();

    let currentDate = utils.getCurrentDate();

    await pool
        .request()
        .input("ticketId", sql.NVarChar, ticketId)
        .input("accountId", sql.NVarChar, accountId)
        .input("showTimeId", sql.NVarChar, showTimeId)
        .input("seatNumber", sql.Int, seatNumber)
        .input("purchaseDate", sql.NVarChar, currentDate)
        .query(sqlQueries.addTicket);

    console.log("Buy succesfully ticket: " + ticketId);
}

const buyTickets = async (data) => {
    try {
        const userBalance = await users.getBalanceOfUser(data.accountId);
        const cost = await st.getCostOfShowTime(data.showTimeId);

        // Check balance of user enough or not
        if (userBalance < cost * data.seatNumbers.length) {
            return {
                message: "Your balance is not enough",
            };
        }

        // Check if seats are available
        var isSeated = { value: false };

        for (const seatNumber of data.seatNumbers) {
            await checkSeats(data.showTimeId, seatNumber, isSeated);
        }

        if (isSeated.value) {
            return {
                message: "Your chosen seats are not available now",
            };
        }

        // Add ticket
        for (const seatNumber of data.seatNumbers) {
            await addTicket(data.accountId, data.showTimeId, seatNumber);
        }

        const boughtUser = await users.reduceBalance({
            accountId: data.accountId,
            totalCost: cost * data.seatNumbers.length,
        });

        return {
            message: "Buy tickets successfully",
            ...boughtUser,
        };
    } catch (error) {
        return { message: error.message };
    }
};

const deleteTicket = async (data) => {
    try {
        const accountId = data.accountId;
        const ticketId = data.ticketId;

        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries("ticket/sql");

        // get ticket information
        const ticketData = await pool
            .request()
            .input("ticketId", sql.NVarChar, ticketId)
            .query(sqlQueries.getTicketInformation);

        // if does not exist or showing date <= current date
        if (ticketData.recordset[0] == null) {
            return {
                message: `Can not refund this ticket, you can only refund before the showing date`,
            };
        }

        // delete ticket
        await pool
            .request()
            .input("ticketId", sql.NVarChar, ticketId)
            .query(sqlQueries.deleteTicket);

        // refund for user
        return await users.rechargeBalance(
            ticketData.recordset[0].cost,
            accountId
        );
    } catch (error) {
        return { message: error.message };
    }
};

const getAllTicket = async () => {
    try {
        let pool = await sql.connect(config.sql);

        const tickets = await pool.request().query("select * from Ticket_List");

        return tickets.recordset;
    } catch (error) {
        return error.message;
    }
};
export default {
    buyTickets,
    deleteTicket,
    getAllTicket,
};
