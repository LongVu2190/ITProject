import { showTimeQueries } from '../data/index.js'

const addShowTime = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await showTimeQueries.addShowTime(data);
        
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getComingShowTime = async (req, res, next) => {
    try {
        const showTime = await showTimeQueries.getComingShowTime();

        res.send(showTime);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getNowShowTime = async (req, res, next) => {
    try {
        const showTime = await showTimeQueries.getNowShowTime();

        res.send(showTime);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllShowTime = async (req, res, next) => {
    try {
        const response = await showTimeQueries.getAllShowTime();
        
        res.send(response);
    } catch (error) {
        res.status(400).send(error.message);
    }
  }

const getSeatsOfShowTime = async (req, res, next) => {
    try {
        const showTimeId = req.params.showTimeId;

        const response = await showTimeQueries.getSeatsOfShowTime(showTimeId);
        
        res.send(response);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getTimes = async (req, res, next) => {
    try {
        const data = req.params;
        const response = await showTimeQueries.getTimes(data);
        
        res.send(response);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export default {
    addShowTime,
    getComingShowTime,
    getNowShowTime,
    getAllShowTime,
    getSeatsOfShowTime,
    getTimes
}