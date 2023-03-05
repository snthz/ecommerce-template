const { validatePassword, generateToken } = require("../utils/utils");
const User = require("../models/AdminUser");

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const validPassword = validatePassword(user, password);

    if (!validPassword) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    const token = generateToken(user);

    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

async function register(req, res) {
  const { firstName, lastName, email, password } = req.body;

  try {
    const userFound = await User.findOne({ where: { email } });
    if (userFound)
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    const token = generateToken(user);

    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

module.exports = {
    login,
    register
}