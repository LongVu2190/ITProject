import express from 'express';
import config from './config.js';
import cors from 'cors';
import bodyParser from 'body-parser';

import { movieRouter, userRouter, showTimeRouter, ticketRouter, commentRouter } from './routes/index.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/movie/', movieRouter);
app.use('/user/', userRouter);
app.use('/showtime/', showTimeRouter);
app.use('/ticket/', ticketRouter);
app.use('/comment/', commentRouter);

app.listen(config.port, () => {
    console.log('app listening on url http://localhost:' + config.port)
});