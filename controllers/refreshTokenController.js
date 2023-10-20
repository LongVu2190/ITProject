import utils from "../data/utils.js";
import config from "../config/config.js";
import sql from "mssql";
import jwt from "jsonwebtoken";

const updateRefreshToken = async (accountId, refreshToken) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries("user/sql");

        await pool
            .request()
            .input("accountId", sql.NVarChar, accountId)
            .input("refreshToken", sql.NVarChar, refreshToken)
            .query(sqlQueries.updateRefreshToken);
    } catch (error) {
        console.log(error.message);
    }
};

const checkRefreshToken = async (refreshToken) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries("user/sql");
        let foundUser = await pool
            .request()
            .input("refreshToken", sql.NVarChar, refreshToken)
            .query(sqlQueries.getUserRefreshToken);

        if (foundUser.recordset[0] == null) {
            return false;
        }
        return {
            ...foundUser.recordset[0],
        };
    } catch (error) {
        console.log(error.message);
    }
};

const handleRefreshToken = async (req, res, next) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(401);
    const refreshToken = cookies.jwt;

    const foundUser = await checkRefreshToken(refreshToken);

    if (!foundUser) {
        return res.status(403).send("Forbidden");
    }

    const jwtObject = jwt.decode(refreshToken, process.env.REFRESH_JWT_SECRET);
    const isExpired = Date.now() >= jwtObject.exp * 1000;

    if (!isExpired) {
        if (foundUser.username != jwtObject.data.username) {
            return res.status(401);
        } else {
            const accessToken = jwt.sign(
                { data: foundUser },
                process.env.JWT_SECRET,
                { expiresIn: "20s" }
            );
            const refreshToken = jwt.sign(
                { data: foundUser },
                process.env.REFRESH_JWT_SECRET,
                { expiresIn: "20s" }
            );
            await updateRefreshToken(foundUser.accountId, refreshToken);
            res.cookie("jwt", refreshToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
            });
            res.json({ accessToken });
        }
    } else {
        return res.status(403).send("Forbidden");
    }
};

export default {
    handleRefreshToken,
};
