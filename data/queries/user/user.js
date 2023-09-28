import utils from '../../utils.js';
import config from '../../../config.js';
import sql from 'mssql';
import bcrypt from 'bcrypt';

const addUser = async (data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('user');

        const Account_ID = utils.generateRandomID();
        const hashPass = await bcrypt.hash(data.Password, parseInt(process.env.SALT_ROUNDS));

        const insertEvent = await pool.request()
                            .input('Account_ID', sql.NVarChar, Account_ID)
                            .input('UserName', sql.NVarChar, data.UserName)
                            .input('Password', sql.NVarChar, hashPass)
                            .input('NickName', sql.NVarChar, data.NickName)
                            .input('Email', sql.NVarChar, data.Email)
                            .query(sqlQueries.addUser);   
                            
        return insertEvent.recordset;
    } catch (error) {
        if (error.number == 2601) {
            throw new Error ("Trùng cmm")
        }
        else 
            return error
    }
}

const updateBalance = async (user) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('user');

        const update = await pool.request()
                        .input('Account_ID', sql.NVarChar, user.Account_ID)
                        .input('Cost', sql.Int, user.Cost)
                        .query(sqlQueries.updateBalance);

        return update.recordset;
    } catch (error) {
        return error.message;
    }
}

const getBalance = async(Account_ID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('user');

        const event = await pool.request()
                            .input('Account_ID', sql.NVarChar, Account_ID)
                            .query(sqlQueries.getBalance);
        return event.recordset[0];
    } catch (error) {
        return error.message;
    }
}

const getUser = async(data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('user');

        const user = await pool.request()
                                .input('Email', sql.NVarChar, data.Email)
                                .query(sqlQueries.getUser);

        if (user.recordset[0] == null)
        {
            return {
                message: "Account does not exist",
            };
        }

        let checkOK = await bcrypt.compare(data.Password, user.recordset[0].Password);

        if (checkOK)
        {
            return {
                message: "Login successfully",
                data: user.recordset
            };
        }
        
        return {
            message: "Wrong password",
        };

    } catch (error) {
        return error;
    }
}
export default {
    addUser,
    updateBalance,
    getBalance,
    getUser
}