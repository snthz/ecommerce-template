const sequelize = require("../database/database");
const bcrypt = require("bcrypt");
const { DataTypes } = require("sequelize");
const { generateAvatar } = require("../utils/utils");


const AdminUser = sequelize.define("adminUser", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  avatar: {
    type: DataTypes.TEXT,
  },
  firstName: {
    type: DataTypes.STRING(25),
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING(25),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

AdminUser.beforeCreate((user) => {
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(user.password, salt);

  user.avatar = generateAvatar(user);
});

module.exports = AdminUser;
