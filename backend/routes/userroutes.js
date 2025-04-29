const express = require('express');
const router = express.Router();
const { addUser, updatePassword, getUsers } = require('../controller/usercontroller');
const { verifyToken, permitRoles } = require('../middleware/auth');

router.post('/', verifyToken, permitRoles('admin'), addUser);
router.put('/password', verifyToken, updatePassword);
router.get('/', verifyToken, permitRoles('admin'), getUsers);

module.exports = router;
