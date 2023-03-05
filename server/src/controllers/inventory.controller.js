const { validateIdNumber } = require("../utils/utils");

const Inventory = require("../models/Inventory");
const Product = require("../models/Product");

async function getInventory(req, res) {
  try {
    const inventory = await Inventory.findAll({
      include: {
        model: Product,
        attributes: ["name", "description", "price"],
      },
    });
    res.json(inventory);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      data: {},
    });
  }
}

async function getInventoryById(req, res) {
  const { id } = req.params;
  if (!validateIdNumber(id)) res.status(400).json({ message: "Invalid id" });

  try {
    const inventory = await Inventory.findOne({
      where: {
        id,
      },
      include: {
        model: Product,
        attributes: ["name", "description", "price"],
      },
    });
    res.json(inventory);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      data: {},
    });
  }
}

async function createInventory(req, res) {
  const { quantity, quantitySold, productId } = req.body;

  try {
    const newInventory = await Inventory.create(
      {
        quantity,
        quantitySold,
        productId,
      },
      {
        fields: ["quantity", "quantitySold", "productId"],
      }
    );
    if (newInventory) {
      res.json({
        message: "Inventory created successfully",
        data: newInventory,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      data: {},
    });
  }
}

async function updateInventory(req, res) {
  const { id } = req.params;
  if (!validateIdNumber(id)) res.status(400).json({ message: "Invalid id" });

  const { quantity, quantitySold, productId } = req.body;

  try {
    const inventory = await Inventory.findOne({
      where: {
        id,
      },
    });
    if (inventory) {
      const updatedInventory = await Inventory.update(
        {
          quantity,
          quantitySold,
          productId,
        },
        {
          where: {
            id,
          },
        }
      );
      res.json({
        message: "Inventory updated successfully",
        data: updatedInventory,
      });
    } else {
      res.status(404).json({
        message: "Inventory not found",
        data: {},
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      data: {},
    });
  }
}

async function deleteInventory(req, res) {
    const { id } = req.params;
    if (!validateIdNumber(id)) res.status(400).json({ message: "Invalid id" });
    
    try {
        const inventory = await Inventory.findOne({
        where: {
            id,
        },
        });
        if (inventory) {
        const deletedInventory = await Inventory.destroy({
            where: {
            id,
            },
        });
        res.json({
            message: "Inventory deleted successfully",
            data: deletedInventory,
        });
        } else {
        res.status(404).json({
            message: "Inventory not found",
            data: {},
        });
        }
    } catch (error) {
        res.status(500).json({
        message: "Something went wrong",
        data: {},
        });
    }
}

module.exports = {
    getInventory,
    getInventoryById,
    createInventory,
    updateInventory,
    deleteInventory
}