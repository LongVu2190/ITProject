import { userQueries } from '../data/queries/index.js'

const addUser = async (req, res, next) => {
    try {
        const data = req.query;
        const insert = await userQueries.addUser(data);
        
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}


export default {
    addUser
}