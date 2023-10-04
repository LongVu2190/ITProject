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
            .input("Email", sql.NVarChar, data.email)
            .query(sqlQueries.login);
           
        existingUser = existingUser.recordset[0];

        // Check if exist
        if (existingUser == null) {
            return {
                message: 'Wrong email or password'
            };
        }

        // Check password
        let isMatch = await bcrypt.compare(
            data.Password,
            existingUser.Password
        );

        if (isMatch) {
            // Create JWS
            let token = jwt.sign(
                {
                    data: existingUser,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1 day',
                }
            );
            
            existingUser.token = token;

            // Return message
            return {
                message: "Login successfully",
                ...existingUser,
            };
        } else {
            return {
                message: 'Wrong email or password',
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
            .input("Account_ID", sql.NVarChar, accountId)
            .input("UserName", sql.NVarChar, data.userName)
            .input("Password", sql.NVarChar, hashPass)
            .input("NickName", sql.NVarChar, data.nickName)
            .input("Email", sql.NVarChar, data.email)
            .query(sqlQueries.register);

        return {
            ...insertUser.recordset[0],
        };
    } catch (error) {
        if (error.number == 2601) {
            throw new Error (
                "Account exist, please use another email or username"
            );
        } else return error.message;
    }
};

const getBalance = async (data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries("user/sql");

        const event = await pool
            .request()
            .input("Account_ID", sql.NVarChar, data.accountId)
            .query(sqlQueries.getBalance);
        return event.recordset[0];
    } catch (error) {
        return error.message;
    }
};

const reduceBalance = async (data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries("user/sql");

        const update = await pool
            .request()
            .input("Account_ID", sql.NVarChar, data.accountId)
            .input("Cost", sql.Int, data.cost)
            .query(sqlQueries.reduceBalance);

        console.log("Updated balance of user: " + data.accountId);
        console.log("Balance reduced: " + data.cost);

        return {
            user: update.recordset,
            totalCost: data.cost,
        };
    } catch (error) {
        return error.message;
    }
};

const rechargeBalance = async (data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries("user/sql");

        const recharge = await pool
            .request()
            .input("Account_ID", sql.NVarChar, data.accountId)
            .input("Recharge", sql.Int, data.recharge)
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
        return error.message;
    }
};

export default {
    login,
    register,
    getBalance,
    reduceBalance,
    rechargeBalance,
};
