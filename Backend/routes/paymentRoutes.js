const express = require('express');
const router = express.Router();

const{
  checkout,
  verify,
  userOrder,
  allOrders,
}  = require('../controllers/paymentController');
router.get('/payment' , (req, res) => {
  res.render("payment");    
    
});

// checkout
router.post('/checkout',checkout);

// verify-payment & save to db
router.post('/verify-payment',verify)

// user order
router.get("/userorder", userOrder);

// All order's
router.get("/orders", allOrders);


module.exports = router;