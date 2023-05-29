const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/constants/corsOpt");
const app = express();

// setup middlewares
app.use(cors(corsOptions));
app.use(express.json());

module.exports = app;
