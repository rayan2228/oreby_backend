const express = require("express");
const {
  createSubCategory,
  getAllSubCategory,
} = require("../../../controllers/subCategory/subCategoryController");
const router = express.Router();

router.post("/create", createSubCategory);
router.get("/get", getAllSubCategory);
router.get("/get/:name", getAllSubCategory);

module.exports = router;
