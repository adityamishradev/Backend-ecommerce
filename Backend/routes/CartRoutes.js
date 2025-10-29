const express = require('express');
const router = express.Router();
const {addItemToCart, getcartItems, decreaseProduct} = require("../controllers/cartController");
const { Authenticated } = require('../middleware/authMiddleware');

router.post('/add', Authenticated,addItemToCart);
router.get('/:userId',Authenticated, getcartItems);
router.post('/--qty',Authenticated, decreaseProduct);
router.delete('/remove',Authenticated, decreaseProduct);
 

module.exports = router;