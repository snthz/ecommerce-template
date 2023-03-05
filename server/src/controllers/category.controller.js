const Category = require("../models/Category");

async function getCategories(req, res) {
  try {
    const categories = await Category.findAll();
    res.status(200).json({
      message: "Categories",
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
}

async function createCategory(req, res) {
  const { name } = req.body;
  try {
    const category = await Category.create({
      name,
    });
    res.status(201).json({
      message: "Category created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
}

async function updateCategory(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await Category.update(
      {
        name,
      },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).json({
      message: "Category updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
}

async function deleteCategory(req, res) {
  const { id } = req.params;
  try {
    await Category.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({
      message: "Category deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
}

async function deleteAllCategories(req, res) {
  try {
    await Category.destroy({
      where: {},
      truncate: false,
    });
    res.status(200).json({
      message: "All categories deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
}

module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    deleteAllCategories,
}
