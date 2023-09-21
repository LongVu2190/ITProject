import { commentQueries } from '../data/queries/index.js'

const addComment = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await commentQueries.addComment(data);
        
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export default {
    addComment
}