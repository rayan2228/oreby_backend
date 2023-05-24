const mongoose = require("mongoose");
const db = async () => {
  await mongoose
    .connect(
        process.env.DB_URL
    )
    .then(() => {
      console.log("db connected");
    });
};

module.exports = db;
