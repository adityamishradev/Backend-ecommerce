const express = require('express');
const router = express.Router();
const {addProduct ,getProducts,getProductById,updateProductById,deleteProductById}= require('../controllers/productController')

// add product
router.post('/add',addProduct)

// get product
router.get('/all',getProducts)

// get product by Id
router.get('/:id',getProductById)

// update product by Id
router.put('/:id',updateProductById)

// delete product by Id
router.delete('/:id',deleteProductById)
module.exports = router;