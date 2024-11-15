const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')

//router objects
const router = express.Router()
const {placeOrder, orderStatus} = require('../controller/orderController')

//PLACE ORDER
router.post('/placeOrder', authMiddleware, placeOrder)


//ORDER STATUS
router.post('/orderStatus/:id', adminMiddleware, orderStatus)

//export routes
module.exports = router