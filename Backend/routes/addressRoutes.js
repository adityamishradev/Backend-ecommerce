const express = require('express');
const router = express.Router();
const{addAddress, getUserAddresses} = require('../controllers/addressController');
const { Authenticated } = require('./middleware/authMiddleware');
// add address
router.post("/add", addAddress);

// get address
router.get('/get', getUserAddresses)

module.exports = router;