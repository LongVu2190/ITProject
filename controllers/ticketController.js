import { ticketQueries } from '../data/queries/index.js'

const addTicket = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await ticketQueries.addTicket(data);
        
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getTicket = async (req, res, next) => {
    try {
        const data = req.body;
        const ticket = await ticketQueries.getTicket(data);
        
        res.send(ticket);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export default {
    addTicket,
    getTicket
}