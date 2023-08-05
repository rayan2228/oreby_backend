const express = require("express");
const {
  createSubCategory,
  getAllSubCategory,
  subCategorySoftDelete,
  subCategoryAllSoftDelete,
} = require("../../../controllers/subCategory/subCategoryController");
const router = express.Router();

router.post("/create", createSubCategory);
router.get("/get", getAllSubCategory);
router.get("/get/:name", getAllSubCategory);
router.get("/trash/:name", subCategorySoftDelete);
router.post("/trash/", subCategoryAllSoftDelete);
module.exports = router;
