import { showTimeQueries } from '../data/queries/index.js'

const addShowTime = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await showTimeQueries.addShowTime(data);
        
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export default {
    addShowTime
}