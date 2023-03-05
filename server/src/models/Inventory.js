const sequelize = require("../database/database");
const { DataTypes } = require("sequelize");

const Product = require("./Product");

const Inventory = sequelize.define("inventory", {
    quantity:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantitySold:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    
});

Product.hasMany(Inventory, {
    foreignKey: "productId",
    sourceKey: "id",
    onDelete: "CASCADE",
});

Inventory.belongsTo(Product, {
    foreignKey: "productId",
    targetKey: "id",
    onDelete: "CASCADE",
});

module.exports = Inventory;