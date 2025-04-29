const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();

const register = (req, res) => {
  const { name, email, password, address, role } = req.body;

  if (password.length < 8 || !/[A-Z]/.test(password) || !/[^a-zA-Z0-9]/.test(password)) {
    return res.status(400).json({ message: "Password must be 8-16 characters, include uppercase and special char" });
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json(err);
    User.create({ name, email, password: hash, address, role }, (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: "User registered" });
    });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ message: "Invalid credentials" });

    const user = results[0];
    bcrypt.compare(password, user.password, (err, match) => {
      if (!match) return res.status(401).json({ message: "Invalid credentials" });

      const token = jwt.sign(
        { id: user.id, role: user.role, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
      res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
    });
  });
};

module.exports = { register, login };
