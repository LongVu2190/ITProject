import { commentQueries } from '../data/index.js'

const addComment = async (req, res, next) => {
    try {
        const data = req.body;
        const response = await commentQueries.addComment(data);       
        res.send(response);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteComment = async (req, res, next) => {
    try {
        const data = req.body;
        const response = await commentQueries.deleteComment(data);
        res.send(response);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getCommentByMovie = async (req, res, next) => {
    try {
        const data = req.body.movieId;
        const response = await commentQueries.getCommentByMovie(data);
        res.send(response);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export default {
    addComment,
    deleteComment,
    getCommentByMovie
}