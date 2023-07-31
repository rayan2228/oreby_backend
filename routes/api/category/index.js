const express = require("express");
const categoryController = require("../../../controllers/category/categoryController");
const router = express.Router();

router.post("/create", categoryController);
module.exports = router;
