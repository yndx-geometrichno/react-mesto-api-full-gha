require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { rateLimit } = require("express-rate-limit");
const cors = require("cors");
const helmet = require("helmet");
const { errors } = require("celebrate");
const router = require("./routes/index");
const { requestLogger, errorLogger } = require("./middleware/logger");
const errorHandler = require("./middleware/ErrorHandlingMiddleWare");
// const { DB_PORT, DB_URL } = process.env;
const DB_PORT = 3000;
const DB_URL = "mongodb://127.0.0.1:27017/mestodb";
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10000, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  message: "Too many requests from this IP, please try again later.",
});

const app = express();
app.use(helmet());
app.use(
  cors({
    origin: [
      "https://bestfrontend.here.nomoredomainsmonster.ru",
      "http://bestfrontend.here.nomoredomainsmonster.ru",
      "http://localhost:3000",
    ],
    credentials: true,
    maxAge: 30,
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  })
);
app.use(limiter);
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

mongoose.connect(DB_URL, {});

app.use("/", router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(DB_PORT);
