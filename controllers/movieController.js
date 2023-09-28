import { movieQueries } from '../data/index.js'

const addMovie = async (req, res, next) => {
    try {
        const data = req.body;
        const response = await movieQueries.addMovie(data);       
        res.send(response);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export default {
    addMovie,
}