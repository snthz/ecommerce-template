const { Router } = require("express");
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  deleteAllCategories,
} = require("../controllers/category.controller");

const router = Router();

// read
router.get("/", getCategories);

// create
router.post("/", createCategory);

// update
router.put("/:id", updateCategory);

// delete
router.delete("/", deleteAllCategories);
router.delete("/:id", deleteCategory);

module.exports = router;
