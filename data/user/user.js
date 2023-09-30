import utils from "../utils.js";
import config from "../../config.js";
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
            .input("Email", sql.NVarChar, data.Email)
            .query(sqlQueries.login);

        existingUser = existingUser.recordset[0];

        // Check if exist
        if (existingUser.Password == null) {
            return {
                message: "Wrong email or password",
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
                    expiresIn: "10 days",
                }
            );

            existingUser.Token = token;

            // Return message
            return {
                message: "Login successfully",
                data: existingUser,
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

        const Account_ID = utils.generateRandomID();

        const hashPass = await bcrypt.hash(
            data.Password,
            parseInt(process.env.SALT_ROUNDS)
        );

        const insertUser = await pool
            .request()
            .input("Account_ID", sql.NVarChar, Account_ID)
            .input("UserName", sql.NVarChar, data.UserName)
            .input("Password", sql.NVarChar, hashPass)
            .input("NickName", sql.NVarChar, data.NickName)
            .input("Email", sql.NVarChar, data.Email)
            .query(sqlQueries.register);

        return {
            message: "Created account succesfully",
            data: insertUser.recordset,
        };
    } catch (error) {
        if (error.number == 2601) {
            throw new Error(
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
            .input("Account_ID", sql.NVarChar, data.Account_ID)
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
            .input("Account_ID", sql.NVarChar, data.Account_ID)
            .input("Cost", sql.Int, data.Cost)
            .query(sqlQueries.reduceBalance);

        console.log("Updated balance of user: " + data.Account_ID);
        console.log("Balance reduced: " + data.Cost);

        return {
            user: update.recordset,
            totalCost: data.Cost,
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
            .input("Account_ID", sql.NVarChar, data.Account_ID)
            .input("Recharge", sql.Int, data.Recharge)
            .query(sqlQueries.rechargeBalance);

        console.log(
            "Recharged balance of user: " +
                data.Account_ID +
                " + " +
                data.Recharge
        );

        return {
            message: "Recharged successfully",
            user: recharge.recordset,
            totalRecharge: data.Recharge,
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
