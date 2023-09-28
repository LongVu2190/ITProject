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

const getSeatsOfShowTime = async (req, res, next) => {
    try {
        const ShowTime_ID = req.body.ShowTime_ID;
        const seats = await ticketQueries.getSeatsOfShowTime(ShowTime_ID);
        
        res.send(seats);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export default {
    addTicket,
    getSeatsOfShowTime
}