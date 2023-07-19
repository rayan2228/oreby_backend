const express = require("express");
const router = express.Router();

router.get("/register", (_, res) => res.send("yes"));

module.exports = router;
