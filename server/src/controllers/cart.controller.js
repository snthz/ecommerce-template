const { validateIdNumber } = require("../utils/utils");

const Cart = require("../models/Cart");
const Product = require("../models/Product");

async function getCart(req, res) {
  try {
    const cart = await Cart.findAll({
      where: {
        userId: req.user.id,
      },
      include: [
        {
          model: Product,
          attributes: ["id", "name", "price", "image"],
        },
      ],
    });
    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function addProductToCart(req, res) {
  try {
    const { productId } = req.params;
    if (!validateIdNumber(productId)) {
        return res.status(400).json({ message: "Invalid product id" });
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const cart = await Cart.findOne({
      where: {
        productId,
        userId: req.user.id,
      },
    });
    if (cart) {
      cart.quantity += 1;
      await cart.save();
      return res.status(200).json(cart);
    }
    const newCart = await Cart.create({
      productId,
      userId: req.user.id,
    });
    res.status(201).json(newCart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function updateProductQuantity(req, res) {
  try {
    const { productId } = req.params;
    if (!validateIdNumber(productId)) {
        return res.status(400).json({ message: "Invalid product id" });
    }

    const { quantity } = req.body;
    const cart = await Cart.findOne({
      where: {
        productId,
        userId: req.user.id,
      },
    });

    if (!cart) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (quantity <= 0) {
        return res.status(400).json({ message: "Invalid quantity" });
    }

    cart.quantity = quantity;
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteProductFromCart(req, res) {
  try {
    const { productId } = req.params;
    if (!validateIdNumber(productId)) {
        return res.status(400).json({ message: "Invalid product id" });
    }
    
    const cart = await Cart.findOne({
      where: {
        productId,
        userId: req.user.id,
      },
    });
    if (!cart) {
      return res.status(404).json({ message: "Product not found" });
    }
    await cart.destroy();
    res.status(204).json();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getCart,
  addProductToCart,
  deleteProductFromCart,
  updateProductQuantity,
};
