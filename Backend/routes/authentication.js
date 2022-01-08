const express = require('express');
const router = express.Router();
const productController = require('./../controllers/Register');

router.post('/register', productController.createUser);
router.get('/userdetails', productController.GetUserDetails);
router.post('/login', productController.getUser);
router.post('/UpdatePass',productController.UpdatePass)
router.post('/UpdateAddress',productController.Address)
router.post('/GetAddress',productController.getAddress)

module.exports = router;
