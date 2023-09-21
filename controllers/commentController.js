import { commentQueries } from '../data/queries/index.js'

const addComment = async (req, res, next) => {
    try {
        const data = req.body;
        const comment = await commentQueries.addComment(data);
        
        res.send(comment);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export default {
    addComment
}