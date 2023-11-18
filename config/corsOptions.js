import allowedOrigins from "./allowedOrigins.js";

const corsOptions = {
  origin: (origin, callback) => {
    callback(null, true);
  },
  optionsSuccessStatus: 200,
  credentials: true,
  allowedHeaders: ["Content-Type"],
};

export default corsOptions;
