import utils from '../../utils.js';
import config from '../../../config.js';
import sql from 'mssql';
import bcrypt from 'bcrypt';

const addUser = async (data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('user');

        const hashPass = await bcrypt.hash(data.Password, parseInt(process.env.SALT_ROUNDS));

        const insertEvent = await pool.request()
                            .input('UserName', sql.NVarChar, data.UserName)
                            .input('Password', sql.NVarChar, hashPass)
                            .input('NickName', sql.NVarChar, data.NickName)
                            .input('Email', sql.NVarChar, data.Email)
                            .query(sqlQueries.addUser);   
                            
        return insertEvent.recordset;
    } catch (error) {
        return error;
    }
}

export default {
    addUser
}