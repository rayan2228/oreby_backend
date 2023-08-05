const express = require("express");
const {
  createCategory,
  getAllCategory,
  getCategoryByName,
  categorySoftDelete,
  categoryAllSoftDelete,
  getAllCategoryWithTrash,
  getAllCategoryOnlyTrash,
} = require("../../../controllers/category/categoryController");
const router = express.Router();

router.post("/create", createCategory);
router.get("/get", getAllCategory);
router.get("/get/:name", getCategoryByName);
router.get("/trash/:name", categorySoftDelete);
router.post("/trash/", categoryAllSoftDelete);
router.get("/withtrash", getAllCategoryWithTrash);
router.get("/onlytrash", getAllCategoryOnlyTrash);
module.exports = router;
