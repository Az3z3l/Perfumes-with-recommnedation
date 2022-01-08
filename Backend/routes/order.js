const express = require('express');
const router = express.Router();
const OrderController = require('./../controllers/Order');

router.get('/getOrders', OrderController.getOrders);
router.get('/pdfDownload', OrderController.PdfGen);
router.post('/', OrderController.Order);

module.exports = router;