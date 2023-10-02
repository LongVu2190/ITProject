import allowedOrigins from "./allowedOrigins.js";

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    setting: (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token, X-Requested-With, authorization");
        res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
        if (req.method === 'OPTIONS') {
            res.sendStatus(200);
        } else {
            next();
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
}

export default corsOptions