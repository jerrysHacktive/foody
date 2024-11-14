const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')

//router objects
const router = express.Router()
const {createFood, getAllFoods, getSingleFood, getFoodByRestaurant} = require('../controller/foodController')

// routes 
router.post('/create', authMiddleware, createFood)

// to get all food items
router.get('/getAll', getAllFoods)

// to get a single food by ID
router.get('/get/:id', getSingleFood)

// to get food by restaurant
router.get('/getFoodByRestaurant/:id', getFoodByRestaurant)

//export routes
module.exports = router