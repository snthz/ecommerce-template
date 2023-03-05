const Product = require("../models/Product");
const Category = require("../models/Category");

async function getProducts(req, res) {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["name"],
        },
      ],
    });
    res.status(200).json({
      message: "Products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
}

async function getProductsByCategory(req, res) {
  const { 
    
   } = req.params;
  try {
    const category = await Category.findOne({
      where: {
        name,
      },
    });
    console.log(category);
    const products = await Product.findAll({
      where: {
        categoryId: category.id,
      },
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["name"],
        },
      ],
    });
    res.status(200).json({
      message: "Products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
}

async function getProduct(req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["name"],
        },
      ],
    });
    res.status(200).json({
      message: "Product",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
}

async function createProduct(req, res) {
  const { name, price, description, image, categoryId } = req.body;
  try {
    await Product.create({
      name,
      price,
      description,
      image,
      categoryId,
    });
    res.status(200).json({
      message: "Product created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
}

async function updateProduct(req, res) {
  const { id } = req.params;
  const { name, price, description, image, category } = req.body;
  try {
    await Product.update(
      {
        name,
        price,
        description,
        image,
        category,
      },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).json({
      message: "Product updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
}

async function deleteProduct(req, res) {
  const { id } = req.params;
  try {
    await Product.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({
      message: "Product deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
}

async function deleteAllProducts(req, res) {
  try {
    await Product.destroy({
      truncate: false,
    });
    res.status(200).json({
      message: "Products deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
}

module.exports = {
  getProducts,
  getProductsByCategory,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
};
