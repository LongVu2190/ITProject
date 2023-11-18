import express from "express";
import { config, corsOptions } from "./config/index.js";
import credentials from "./middleware/credentials.js";
import cors from "cors";
import bodyParser from "body-parser";

import path, { dirname } from "path";
import multer from "multer";
import { fileURLToPath } from "url";

import checkToken from "./authentication/auth.js";
import cookieParser from "cookie-parser";
import {
    movieRouter,
    userRouter,
    showTimeRouter,
    ticketRouter,
    refreshRouter,
} from "./routes/index.js";
import { movieController } from "./controllers/index.js";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use(checkToken);
app.use(bodyParser.json());

app.use("/public", express.static(path.join(__dirname, "public")));

//File Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/assets/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });
app.post("/movie", upload.single("thumbnail"), movieController.addMovie);
app.use("/movie/", movieRouter);
app.use("/user/", userRouter);
app.use("/showtime/", showTimeRouter);
app.use("/ticket/", ticketRouter);
app.use("/refresh/", refreshRouter);

app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "404.html"));
    } else if (req.accepts("json")) {
        res.json({ error: "404 Not Found" });
    } else {
        res.type("txt").send("404 Not Found");
    }
});

const PORT = config.port ?? 5555;

app.listen(PORT, async () => {
    console.log("Server is listening on PORT " + PORT);
});
