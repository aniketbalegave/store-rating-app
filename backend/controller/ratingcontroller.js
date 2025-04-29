const db = require('../config/db');

// Submit or update rating
exports.submitRating = (req, res) => {
  const userId = req.user.id;
  const { store_id, rating } = req.body;

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating must be between 1 and 5' });
  }

  // Check if rating exists → update or insert
  const checkSql = 'SELECT * FROM ratings WHERE user_id = ? AND store_id = ?';
  db.query(checkSql, [userId, store_id], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length > 0) {
      const updateSql = 'UPDATE ratings SET rating = ?, created_at = NOW() WHERE user_id = ? AND store_id = ?';
      db.query(updateSql, [rating, userId, store_id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Rating updated' });
      });
    } else {
      const insertSql = 'INSERT INTO ratings (user_id, store_id, rating) VALUES (?, ?, ?)';
      db.query(insertSql, [userId, store_id, rating], (err) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ message: 'Rating submitted' });
      });
    }
  });
};

// Get all user ratings (for a specific user)
exports.getUserRatings = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT s.id as store_id, s.name, s.address, r.rating
    FROM ratings r
    JOIN stores s ON r.store_id = s.id
    WHERE r.user_id = ?`;

  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// Admin dashboard counts
exports.getDashboardStats = (req, res) => {
  const sql = `
    SELECT
      (SELECT COUNT(*) FROM users) AS total_users,
      (SELECT COUNT(*) FROM stores) AS total_stores,
      (SELECT COUNT(*) FROM ratings) AS total_ratings
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
};

// Get the rating of a specific store by the logged-in user
exports.getUserRating = (req, res) => {
  const userId = req.user.id;
  const { store_id } = req.query;

  const sql = 'SELECT rating FROM ratings WHERE user_id = ? AND store_id = ?';
  db.query(sql, [userId, store_id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};
