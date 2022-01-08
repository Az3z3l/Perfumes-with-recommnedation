const express = require('express');
const router = express.Router();
const productController = require('./../controllers/Token');

router.post('/settoken', productController.createToken);
router.get('/gettoken', productController.GetUserDetails);
router.post('/deletetoken', productController.DeleteToken);
router.post('/check', productController.GetUserDetails2);

module.exports = router;
