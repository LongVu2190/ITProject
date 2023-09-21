import { userQueries } from '../data/queries/index.js'

const addUser = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await userQueries.addUser(data);
        
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateBalance = async (req, res, next) => {
    try {
        const user = req.body;
        const updated = await userQueries.updateBalance(user);
        res.send({
            message: 'Update successfully',
            data: updated
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getBalance = async (req, res, next) => {
    try {
        const ID = req.body.ID;
        const balance = await userQueries.getBalance(ID);
        res.send(balance);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getUser = async (req, res, next) => {
    try {
        const data = req.body;
        const user = await userQueries.getUser(data);

        res.send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export default {
    addUser,
    updateBalance,
    getBalance,
    getUser
}