import utils from '../../utils.js';
import config from '../../../config.js';
import sql from 'mssql';
import bcrypt from 'bcrypt';

const addUser = async (data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('user');

        const ID = utils.generateRandomID();
        const hashPass = await bcrypt.hash(data.Password, parseInt(process.env.SALT_ROUNDS));

        const insertEvent = await pool.request()
                            .input('ID', sql.NVarChar, ID)
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

const updateBalance = async (userName, data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('user');
        console.log(userName);
        console.log(data.Balance);
        const update = await pool.request()
                        .input('UserName', sql.NVarChar, userName)
                        .input('Balance', sql.Int, data.Balance)
                        .query(sqlQueries.updateBalance);
        return update.recordset;
    } catch (error) {
        return error.message;
    }
}

const getBalance = async(ID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('user');
        const event = await pool.request()
                            .input('ID', sql.NVarChar, ID)
                            .query(sqlQueries.getBalance);
        return event.recordset;
    } catch (error) {
        return error.message;
    }
}

const getUser = async(data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('user');

        const user = await pool.request()
                                .input('UserName', sql.NVarChar, data.UserName)
                                .query(sqlQueries.getUser);

        if (user.recordset[0] === null)
        {
            return {
                message: "Tài khoản mật khẩu sai",
            };
        }

        let checkOK = await bcrypt.compare(data.Password, user.recordset[0].Password);

        if (checkOK)
        {
            return {
                message: "login successfully",
                data: user.recordset
            };
        }
        
        return {
            message: "Tài khoản mật khẩu sai",
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