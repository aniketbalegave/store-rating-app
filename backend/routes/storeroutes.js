const express = require('express');
const router = express.Router();
const { addStore, getStores, getRatingsForOwner } = require('../controller/storecontroller');
const { verifyToken, permitRoles } = require('../middleware/auth');

router.post('/', verifyToken, permitRoles('admin'), addStore);
router.get('/', verifyToken, getStores);
router.get('/owner/ratings', verifyToken, permitRoles('store_owner'), getRatingsForOwner);
// router.get('/:id', getStoreById); // Get store details by ID


module.exports = router;
