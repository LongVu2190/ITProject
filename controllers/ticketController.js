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

const deleteTicket = async (req, res, next) => {
    try {
        console.log(req.body)
        const data = req.body;
        const response = await ticketQueries.deleteTicket(data);
        
        res.send(response);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllTicket = async (req, res, next) => {
    try {
        const response = await ticketQueries.getAllTicket();
        
        res.send(response);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export default {
    buyTickets,
    deleteTicket,
    getAllTicket,
}