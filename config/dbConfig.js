const mongoose = require("mongoose");
async function dbConnection() {
  await mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("db connected"));
}

module.exports = dbConnection;
