const express = require("express");
const router = express.Router();
const apiRoutes = require("./api");
const baseApiURL = "/api/v1";

router.use(baseApiURL, apiRoutes);

router.use(baseApiURL, (_, res) => res.send("bad url"));

module.exports = router;
