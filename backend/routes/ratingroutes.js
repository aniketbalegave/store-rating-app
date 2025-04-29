const express = require('express');
const router = express.Router();
const { submitRating, getUserRatings, getDashboardStats } = require('../controller/ratingcontroller');
const { verifyToken, permitRoles } = require('../middleware/auth');

router.post('/', verifyToken, permitRoles('normal'), submitRating);
router.get('/user', verifyToken, permitRoles('normal'), getUserRatings);
router.get('/admin/dashboard', verifyToken, permitRoles('admin'), getDashboardStats);

module.exports = router;
