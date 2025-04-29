const express = require('express');
const router = express.Router();
const { register, login } = require('../controller/authcontroller');

router.post('/register', register); // normal user signup
router.post('/login', login);

module.exports = router;
