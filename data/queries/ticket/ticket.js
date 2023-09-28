import utils from "../../utils.js";
import config from "../../../config.js";
import sql from "mssql";
import users from "../user/user.js";
import costs from "../showTime/showTime.js";

async function checkSeats(ShowTime_ID, seat, checkSeat) {
    try {
        console.log(ShowTime_ID);
        console.log(seat);
        console.log(checkSeat);

        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries("ticket");

        const availableSeat = await pool
            .request()
            .input("ShowTime_ID", sql.NVarChar, ShowTime_ID)
            .input("Seat_Number", sql.Int, seat)
            .query(sqlQueries.checkAvailableSeat);

        console.log("availableSeat", availableSeat);
        console.log(
            "availableSeat.recordset[0]: " + availableSeat.recordset[0]
        );
        console.log(
            "availableSeat.recordset[0].Seat_Number: " +
                availableSeat.recordset[0].Seat_Number
        );
        if ((await availableSeat.recordset[0]) != null) {
            console.log("OK");
            checkSeat.value = false;
        }
    } catch (error) {
        return error;
    }
}

const addTicket = async (data) => {
    try {
        const ShowTime_ID = data.ShowTime_ID;
        const userBalance = await users.getBalance(data.Account_ID);
        const cost = await costs.getCostOfShowTime(data.ShowTime_ID);

        // Check balance of user
        if (userBalance.Balance < cost.Cost * data.Seat_Number.length) {
            return {
                message: "Not enough balance",
            };
        }

        // Check if seats are available
        var checkSeat = { value: true };

        for (const seat of data.Seat_Number) {
            await checkSeats(ShowTime_ID, seat, checkSeat);
        }

        if (!checkSeat.value) {
            return {
                message: "Not available seat",
            };
        }

        // // Add ticket
        // data.Seat_Number.forEach(async (seat) => {
        //     try {
        //         const Ticket_ID = utils.generateRandomID();
        //         await pool
        //             .request()
        //             .input("Ticket_ID", sql.NVarChar, Ticket_ID)
        //             .input("Account_ID", sql.NVarChar, data.Account_ID)
        //             .input("ShowTime_ID", sql.NVarChar, data.ShowTime_ID)
        //             .input("Seat_Number", sql.Int, seat)
        //             .query(sqlQueries.addTicket);
        //     } catch (error) {
        //         return error;
        //     }
        // });

        // users.updateBalance(
        //     (user = {
        //         Account_ID: data.Account_ID,
        //         Cost: cost.Cost * data.Seat_Number.length,
        //     })
        // );

        return insertTicket.recordset;
    } catch (error) {
        return error;
    }
};

const getSeatsOfShowTime = async (ShowTime_ID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries("ticket");

        const ticket = await pool
            .request()
            .input("ShowTime_ID", sql.NVarChar, ShowTime_ID)
            .query(sqlQueries.getSeatsOfShowTime);

        return ticket.recordset;
    } catch (error) {
        return error;
    }
};

export default {
    addTicket,
    getSeatsOfShowTime,
};
