const express = require("express");
const {
  createSubCategory,
} = require("../../../controllers/subCategory/subCategoryController");
const router = express.Router();

router.use("/create", createSubCategory);

module.exports = router