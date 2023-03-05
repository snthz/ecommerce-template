const { Router } = require("express");
const {
  getCart,
  addProductToCart,
  updateProductQuantity,
  deleteProductFromCart,
} = require("../controllers/cart.controller");

const router = Router();

router.get("/", getCart);

router.post("/:productId", addProductToCart);

router.put("/:productId", updateProductQuantity);

router.delete("/:productId", deleteProductFromCart);

module.exports = router;