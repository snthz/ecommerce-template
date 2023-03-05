const { Sequelize } = require('sequelize');
const sequelize = new Sequelize("ecommerce_db", "postgres", "postgres", {
    host: "localhost",
    dialect: "postgres",
});

module.exports = sequelize;