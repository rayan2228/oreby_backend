const express = require("express");
const {
  createCategory,
  getAllCategory,
  getCategoryByName,
  categorySoftDelete,
  categoryAllSoftDelete,
} = require("../../../controllers/category/categoryController");
const router = express.Router();

router.post("/create", createCategory);
router.get("/get", getAllCategory);
router.get("/get/:name", getCategoryByName);
router.get("/trash/:name", categorySoftDelete);
router.post("/trash/", categoryAllSoftDelete);
module.exports = router;
