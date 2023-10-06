import express from 'express';
import { config, corsOptions } from './config/index.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import checkToken from './authentication/auth.js';
import { movieRouter, userRouter, showTimeRouter, ticketRouter, commentRouter } from './routes/index.js';

const app = express();
app.use(express.json());
app.use(cors())
app.use(cors(corsOptions));
app.all('*', corsOptions.setting)

app.use(checkToken);
app.use(bodyParser.json());

app.use('/movie/', movieRouter);
app.use('/user/', userRouter);
app.use('/showtime/', showTimeRouter);
app.use('/ticket/', ticketRouter);
app.use('/comment/', commentRouter);

const PORT = config.port ?? 3000

app.listen(PORT, async () => {
    console.log('Server is listening on PORT ' + PORT)
});