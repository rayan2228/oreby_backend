const express = require("express");
const {
  createSubCategory,
} = require("../../../controllers/subCategory/subCategoryController");
const router = express.Router();

router.post("/create", createSubCategory);

module.exports = router