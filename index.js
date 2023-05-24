require("dotenv").config();

const db = require("./config/dbconnect");
const express = require("express");
const app = express();

const cors = require("cors");
const routes = require("./routes");
db();

// middleware
// app.use(cors);
// app.use(routes);
// app.use(express.json());

// // run server
// app.use(8000);
