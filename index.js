require("dotenv").config();
const dbConnection = require("./config/dbConfig.js");
const express = require("express");
const app = express();
const routes = require("./routes");
dbConnection();
app.use(express.json());
app.use(routes);
app.listen(8000, () => console.log("server is running"));
