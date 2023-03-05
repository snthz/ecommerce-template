const sequelize = require("../database/database");
const { DataTypes } = require("sequelize");

const Product = require("./Product");
const User = require("./User");

const Cart = sequelize.define("cart", {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
});

Product.hasMany(Cart, {
    foreignKey: "productId",
    sourceKey: "id",
});
Cart.belongsTo(Product, {
    foreignKey: "productId",
    targetKey: "id",
});

User.hasMany(Cart, {
    foreignKey: "userId",
    sourceKey: "id",
});

Cart.belongsTo(User, {
    foreignKey: "userId",
    targetKey: "id",
});

module.exports = Cart;