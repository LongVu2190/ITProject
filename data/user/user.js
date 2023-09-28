import utils from "../utils.js";
import config from "../../config.js";
import sql from "mssql";
import bcrypt from "bcrypt";

const login = async (data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries("user/sql");
        
        const user = await pool
            .request()
            .input("Email", sql.NVarChar, data.Email)
            .query(sqlQueries.login);

        if (user.recordset[0] == null) {
            return {
                message: "Account does not exist",
            };
        }

        let checkLogin = await bcrypt.compare(
            data.Password,
            user.recordset[0].Password
        );

        if (checkLogin) {
            return {
                message: "Login successfully",
                data: user.recordset,
            };
        } else {
            return {
                message: "Wrong password",
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
            message: "Create account succesfully",
            data: insertUser.recordset,
        };
    } catch (error) {
        if (error.number == 2601) {
            throw new Error("Account exist, please use another email or username");
        } 
        else return error.message;
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
            .query(sqlQueries.updateBalance);

        console.log("Updated balance of user: " + data.Account_ID);
        console.log("Balance reduced: " + data.Cost);

        return {
            user: update.recordset,
            totalCost: data.Cost
        };

    } catch (error) {
        return error.message;
    }
};

export default {
    login,
    register,
    reduceBalance,
    getBalance,
};
