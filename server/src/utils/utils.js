const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.JWT_SECRET_KEY;

function validatePassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

function generateToken(user) {
  const token = jwt.sign(
    {
      firstName: user.firstName,
      email: user.email,
    },
    secretKey,
    {
      expiresIn: "1h",
    }
  );

  return token;
}

function validateToken(token) {
  try {
    const decodeToken = jwt.verify(token, secretKey);
    return decodeToken;
  } catch (err) {
    console.log(err);
    return null;
  }
}

function generateAvatar({ firstName }) {
  return `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}&backgroundColor=b6e3f4,c0aede,d1d4f9`;
}

function validateIdNumber(idNumber) {
  const regex = /^[0-9]{10}$/;
  return regex.test(idNumber);
}

module.exports = {
  validatePassword,
  generateToken,
  validateToken,
  generateAvatar
};
