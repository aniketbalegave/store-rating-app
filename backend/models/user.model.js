const db = require('../config/db');

const User = {
  create: (user, callback) => {
    const query = 'INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [user.name, user.email, user.password, user.address, user.role], callback);
  },

  findByEmail: (email, callback) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], callback);
  },

  findById: (id, callback) => {
    db.query('SELECT * FROM users WHERE id = ?', [id], callback);
  }
};

module.exports = User;
