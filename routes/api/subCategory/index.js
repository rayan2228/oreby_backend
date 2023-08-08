const express = require("express");
const {
  createSubCategory,
  getAllSubCategory,
  subCategorySoftDelete,
  subCategoryAllSoftDelete,
  getAllSubCategoryWithTrash,
  getAllSubCategoryOnlyTrash,
  updateSubCategoryStatus,
} = require("../../../controllers/subCategory/subCategoryController");
const router = express.Router();

router.post("/create", createSubCategory);
router.get("/get", getAllSubCategory);
router.get("/get/:name", getAllSubCategory);
router.get("/trash/:name", subCategorySoftDelete);
router.post("/trash/", subCategoryAllSoftDelete);
router.get("/withtrash/", getAllSubCategoryWithTrash);
router.get("/onlytrash/", getAllSubCategoryOnlyTrash);
router.post("/status/", updateSubCategoryStatus);
module.exports = router;
