const express = require("express");
const {
  createCategory,
  getAllCategory,
  getCategoryByName,
  categorySoftDelete,
  categoryAllSoftDelete,
  getAllCategoryWithTrash,
  getAllCategoryOnlyTrash,
  updateCategoryStatus,
  isActiveCategory,
  activeCategories,
  inactiveCategories,
} = require("../../../controllers/category/categoryController");
const router = express.Router();

router.post("/create", createCategory);
router.get("/get", getAllCategory);
router.get("/get/:name", getCategoryByName);
router.get("/trash/:name", categorySoftDelete);
router.post("/trash/", categoryAllSoftDelete);
router.get("/withtrash", getAllCategoryWithTrash);
router.get("/onlytrash", getAllCategoryOnlyTrash);
router.post("/status", updateCategoryStatus);
router.post("/isactive", isActiveCategory);
router.get("/activecategories", activeCategories);
router.get("/inactivecategories", inactiveCategories);
module.exports = router;
