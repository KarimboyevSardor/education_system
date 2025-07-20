const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.User;
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

// SIGN UP
exports.signup = async (req, res) => {
  try {
    const { firstname, lastname, username, email, password, role } = req.body;
    // Avval username bor-yo‘qligini tekshiramiz
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Bunday username allaqachon mavjud' });
    }
    // Parolni xesh qilish
    const hashedPassword = await bcrypt.hash(password, 10);
    // Foydalanuvchini yaratish
    const newUser = await User.create({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
      role
    });
    const token = jwt.sign({ id: newUser.id, role: newUser.role }, JWT_SECRET, {
      expiresIn: '1d'
    });
    res.status(201).json({
      message: "User created",
      token,
      user: {
        id: newUser.id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ message: "User not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });
    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    const userData = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
      role: user.role
    };
    res.status(200).json({
      message: "Signed in successfully",
      token,
      user: userData
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.me = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.userId; // to'g'ri key
    const updates = req.body;

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const [affected] = await User.update(updates, { where: { id: userId } });

    if (affected === 0) {
      return res.status(404).json({ message: "User not found or nothing to update" });
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const userId = req.userId; // req.user.id emas

    const deleted = await User.destroy({ where: { id: userId } });

    if (deleted === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

