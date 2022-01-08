const express = require('express');
const router = express.Router();
const productController = require('./../controllers/product');

router.get('/', productController.getProducts);
router.post('/upload', productController.UploadProduct);
router.post('/delete', productController.DeleteUser);
router.get('/:id', productController.getProduct);
router.post('/', productController.createProduct);
router.post('/editor', productController.EditProduct);


module.exports = router;
