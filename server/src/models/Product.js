const sequelize = require("../database/database");
const { DataTypes } = require("sequelize");

const Category = require("./Category");

const Product = sequelize.define("product", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Category.hasMany(Product, {
  foreignKey: "categoryId",
  sourceKey: "id",
  onDelete: "CASCADE",
});
Product.belongsTo(Category, {
  foreignKey: "categoryId",
  targetKey: "id",
  onDelete: "CASCADE",
});

module.exports = Product;
