const sequelize = require("../database/database");
const { DataTypes } = require("sequelize");

const Product = require("./Product");

const Inventory = sequelize.define("inventory", {
    quantity:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    quantitySold:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
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