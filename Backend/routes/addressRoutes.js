const express = require('express');
const router = express.Router();
const{addAddress, getUserAddresses} = require('../controllers/addressController');
const {Authenticated} = require('../middleware/authMiddlewares');
// add address
router.post("/add", Authenticated, addAddress);

// get address
router.get('/get', Authenticated, getUserAddresses)

module.exports = router;