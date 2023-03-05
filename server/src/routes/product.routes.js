const { Router } = require("express");
const {
  getProducts,
  getProductsByCategory,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteAllProducts
} = require("../controllers/product.controller");

const router = Router();

// read
router.get("/", getProducts);
router.get("/:name", getProductsByCategory);
router.get("/:id", getProduct);

// create
router.post("/", createProduct);

// update
router.put("/:id", updateProduct);

// delete
router.delete("/", deleteAllProducts);
router.delete("/:id", deleteProduct);

module.exports = router;