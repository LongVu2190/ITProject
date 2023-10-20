import express from 'express';
import { config, corsOptions } from './config/index.js';
import cors from 'cors';
import bodyParser from 'body-parser';

import path, { dirname } from 'path'
import multer from 'multer';
import { fileURLToPath } from 'url';

import checkToken from './authentication/auth.js';
import cookieParser from 'cookie-parser';
import { movieRouter, userRouter, showTimeRouter, ticketRouter, commentRouter, refreshRouter } from './routes/index.js';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(cookieParser());
app.use(cors())
app.use(cors(corsOptions));
app.all('*', corsOptions.setting)

app.use(checkToken);
app.use(bodyParser.json());

app.use('/public', express.static(path.join(__dirname, 'public')));

//File Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assets/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })

app.use('/movie/', movieRouter);
app.use('/user/', userRouter);
app.use('/showtime/', showTimeRouter);
app.use('/ticket/', ticketRouter);
app.use('/comment/', commentRouter);
app.use('/refresh/', refreshRouter);

const PORT = config.port ?? 3000

app.listen(PORT, async () => {
    console.log('Server is listening on PORT ' + PORT)
});