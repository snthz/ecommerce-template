const sequelize = require("../database/database");
const { DataTypes } = require("sequelize");

const Product = require("./Product");

const Category = sequelize.define("category", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
});


module.exports = Category;