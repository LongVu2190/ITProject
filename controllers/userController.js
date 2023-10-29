import { userQueries } from "../data/index.js";

const login = async (req, res, next) => {
    try {
        const data = req.body;
        const response = await userQueries.login(data, res);

        res.send(response);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const logout = async (req, res, next) => {
    try {
        res.clearCookie("jwt");
        res.clearCookie("accessToken");
        res.status(400).send({
            message: "Log out"
        })
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const register = async (req, res, next) => {
    try {
        const data = req.body;
        const response = await userQueries.register(data);

        res.send(response);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getUser = async (req, res, next) => {
    try {
        const accountId = req.params.accountId;
        const response = await userQueries.getUser(accountId);

        res.send(response);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getAllUser = async (req, res, next) => {
    try {
        const response = await userQueries.getAllUser();

        res.send(response);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const rechargeBalance = async (req, res, next) => {
    try {
        const data = req.body;
        const accountId = req.params.accountId;
        const response = await userQueries.rechargeBalance(data, accountId);

        res.send(response);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getTicketsOfUser = async (req, res, next) => {
    try {
        const accountId = req.params.accountId;
        const response = await userQueries.getTicketsOfUser(accountId);

        res.send(response);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export default {
    login,
    logout,
    register,
    getUser,
    rechargeBalance,
    getTicketsOfUser,
    getAllUser,
};
