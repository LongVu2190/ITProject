import utils from "../utils.js";
import config from "../../config/config.js";
import sql from "mssql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async (data) => {
    try {
        let pool = await sql.connect(config.sql);

        const sqlQueries = await utils.loadSqlQueries("user/sql");

        // Find user in database
        let existingUser = await pool
            .request()
            .input("email", sql.NVarChar, data.email)
            .query(sqlQueries.login);

        existingUser = existingUser.recordset[0];

        // Check if exist
        if (existingUser == null) {
            return {
                message: "Wrong email or password",
            };
        }

        // Check password
        let isMatch = await bcrypt.compare(
            data.password,
            existingUser.password
        );

        if (isMatch) {
            // Create JWS
            let token = jwt.sign(
                {
                    data: existingUser,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1 day",
                }
            );

            existingUser.token = token;

            // Return message
            return {
                message: "Login successfully",
                accountId: existingUser.accountId,
                token: existingUser.token,
            };
        } else {
            return {
                message: "Wrong email or password",
            };
        }
    } catch (error) {
        return error.message;
    }
};

const register = async (data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries("user/sql");

        const accountId = utils.generateRandomID();

        const hashPass = await bcrypt.hash(
            data.password,
            parseInt(process.env.SALT_ROUNDS)
        );

        const insertUser = await pool
            .request()
            .input("accountId", sql.NVarChar, accountId)
            .input("username", sql.NVarChar, data.username)
            .input("password", sql.NVarChar, hashPass)
            .input("nickname", sql.NVarChar, data.nickname)
            .input("email", sql.NVarChar, data.email)
            .query(sqlQueries.register);

        return {
            message: "Register successfully",
            ...insertUser.recordset[0],
        };
    } catch (error) {
        if (error.number == 2601) {
            return {
                message: "Account exist, please use another email or username",
            };
        } else return { message: error.message };
    }
};

const getUser = async (accountId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries("user/sql");

        const user = await pool
            .request()
            .input("accountId", sql.NVarChar, accountId)
            .query(sqlQueries.getUser);

        if (user.recordset[0] == null) {
            return {
                message: "Can not find this user",
            };
        }

        return {
            ...user.recordset[0],
        };
    } catch (error) {
        return error.message;
    }
};

const getBalanceOfUser = async (accountId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries("user/sql");

        const user = await pool
            .request()
            .input("accountId", sql.NVarChar, accountId)
            .query(sqlQueries.getBalanceOfUser);

        return user.recordset[0].balance;
    } catch (error) {
        return { message: error.message };
    }
};

const reduceBalance = async (data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries("user/sql");

        console.log(data);
        await pool
            .request()
            .input("accountId", sql.NVarChar, data.accountId)
            .input("totalCost", sql.Int, data.totalCost)
            .query(sqlQueries.reduceBalance);

        console.log("Updated balance of user: " + data.accountId);
        console.log("balance reduced: " + data.totalCost);

        return {
            totalCost: data.totalCost,
        };
    } catch (error) {
        return { message: error.message };
    }
};

const rechargeBalance = async (data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries("user/sql");

        console.log(data);

        const recharge = await pool
            .request()
            .input("accountId", sql.NVarChar, data.accountId)
            .input("recharge", sql.Int, data.recharge)
            .query(sqlQueries.rechargeBalance);

        if (recharge.recordset[0] == null) {
            return {
                message: "Account does not exist",
            };
        }
        console.log(
            "Recharged balance of user: " +
                data.accountId +
                " + " +
                data.recharge
        );

        return {
            message: "Recharged successfully",
            ...recharge.recordset[0],
            totalRecharge: data.recharge,
        };
    } catch (error) {
        return { message: error.message };
    }
};

const getTicketsOfUser = async (accountId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries("user/sql");

        console.log(accountId);
        const tickets = await pool
            .request()
            .input("accountId", sql.NVarChar, accountId)
            .query(sqlQueries.getTicketsOfUser);

        if (tickets.recordset == "") {
            return {
                message: "No ticket",
            };
        }
        return tickets.recordset;
    } catch (error) {
        return { message: error.message };
    }
};

export default {
    login,
    register,
    getBalanceOfUser,
    getUser,
    reduceBalance,
    rechargeBalance,
    getTicketsOfUser
};
