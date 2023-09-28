import { userQueries } from '../data/index.js'

const login = async (req, res, next) => {
    try {
        const data = req.body;
        const response = await userQueries.login(data);

        res.send(response);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const register = async (req, res, next) => {
    try {
        const data = req.body;
        const response = await userQueries.register(data);
        
        res.send(response);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export default {
    login,
    register,
}