const db = require('../config/db');
const bcrypt = require('bcrypt');

// Admin adds new user (admin or normal)
exports.addUser = (req, res) => {
  const { name, email, password, address, role } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json(err);
    const query = 'INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, email, hash, address, role], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: 'User added' });
    });
  });
};

// User updates their password
exports.updatePassword = (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id;

  db.query('SELECT password FROM users WHERE id = ?', [userId], (err, result) => {
    if (err || result.length === 0) return res.status(404).json({ message: 'User not found' });

    bcrypt.compare(currentPassword, result[0].password, (err, match) => {
      if (!match) return res.status(400).json({ message: 'Incorrect current password' });

      bcrypt.hash(newPassword, 10, (err, hash) => {
        if (err) return res.status(500).json(err);
        db.query('UPDATE users SET password = ? WHERE id = ?', [hash, userId], (err) => {
          if (err) return res.status(500).json(err);
          res.json({ message: 'Password updated' });
        });
      });
    });
  });
};

// Admin fetches users (with optional filters)
exports.getUsers = (req, res) => {
  const { name, email, address, role, sortBy = 'name', order = 'ASC' } = req.query;

  let sql = 'SELECT id, name, email, address, role FROM users WHERE 1=1';
  let params = [];

  if (name) {
    sql += ' AND name LIKE ?';
    params.push(`%${name}%`);
  }
  if (email) {
    sql += ' AND email LIKE ?';
    params.push(`%${email}%`);
  }
  if (address) {
    sql += ' AND address LIKE ?';
    params.push(`%${address}%`);
  }
  if (role) {
    sql += ' AND role = ?';
    params.push(role);
  }

  sql += ` ORDER BY ${sortBy} ${order}`;

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};
