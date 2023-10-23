import { movieQueries } from "../data/index.js";

const addMovie = async (req, res, next) => {
  try {
    const { title, cost, genre, region, runTime } = req.body;
    const thumbnail = req.file?.filename ?? "";
    const postData = {
        title, cost, genre, region, runTime, thumbnail
    }
    const response = await movieQueries.addMovie(postData);
    res.send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export default {
  addMovie,
};
