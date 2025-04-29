const db = require('../config/db');

// Admin creates a new store
exports.addStore = (req, res) => {
  const { name, email, address, owner_id } = req.body;

  const query = 'INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)';
  db.query(query, [name, email, address, owner_id || null], (err) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ message: 'Store added' });
  });
};
// Get a specific store by ID
exports.getStoreById = (req, res) => {
  const storeId = req.params.id;

  const sql = `
    SELECT s.id, s.name, s.address, ROUND(AVG(r.rating), 1) AS average_rating
    FROM stores s
    LEFT JOIN ratings r ON s.id = r.store_id
    WHERE s.id = ?
    GROUP BY s.id`;

  db.query(sql, [storeId], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(404).json({ message: 'Store not found' });
    res.json(results[0]);
  });
};


// Get all stores (for users/admins)
exports.getStores = (req, res) => {
  const { name, address, sortBy = 'name', order = 'ASC' } = req.query;

  let sql = `
    SELECT 
      s.id, s.name, s.email, s.address,
      ROUND(AVG(r.rating), 1) AS average_rating
    FROM stores s
    LEFT JOIN ratings r ON s.id = r.store_id
    WHERE 1=1`;
  let params = [];

  if (name) {
    sql += ' AND s.name LIKE ?';
    params.push(`%${name}%`);
  }
  if (address) {
    sql += ' AND s.address LIKE ?';
    params.push(`%${address}%`);
  }

  sql += ` GROUP BY s.id ORDER BY ${sortBy} ${order}`;

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// For store owners: list users who rated their store
exports.getRatingsForOwner = (req, res) => {
  const ownerId = req.user.id;

  const sql = `
    SELECT u.name, u.email, r.rating, r.created_at
    FROM ratings r
    JOIN users u ON u.id = r.user_id
    JOIN stores s ON s.id = r.store_id
    WHERE s.owner_id = ?`;

  db.query(sql, [ownerId], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};
