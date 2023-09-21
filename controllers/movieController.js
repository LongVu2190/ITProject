import { movieQueries } from '../data/queries/index.js'

const addMovie = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await movieQueries.addMovie(data);
        
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllMovie = async (req, res, next) => {
    try {
        const movies = await movieQueries.getAllMovie();

        res.send(movies);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export default {
    addMovie,
    getAllMovie
}