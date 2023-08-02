const express = require("express");
const {
  createCategory,
  getAllCategory,
  getCategoryByName,
} = require("../../../controllers/category/categoryController");
const router = express.Router();

router.post("/create", createCategory);
router.get("/get", getAllCategory);
router.get("/get/:name", getCategoryByName);
module.exports = router;
