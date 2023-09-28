import { ticketQueries } from '../data/index.js'

const buyTickets = async (req, res, next) => {
    try {
        const data = req.body;
        const response = await ticketQueries.buyTickets(data);
        
        res.send(response);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export default {
    buyTickets
}