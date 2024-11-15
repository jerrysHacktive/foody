const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
//const adminMiddleware = require('../middleware/adminMiddleware')
//router objects
const router = express.Router()
const {createFood, getAllFoods, getSingleFood, getFoodByRestaurant, updateFood, deleteFood,placeOrder} = require('../controller/foodController')

// routes 
router.post('/create', authMiddleware, createFood)

// to get all food items
router.get('/getAll', getAllFoods)

// to get a single food by ID
router.get('/get/:id', getSingleFood)

// to get food by restaurant
router.get('/getFoodByRestaurant/:id', getFoodByRestaurant)

//update food by id
router.put('/update/:id', authMiddleware,updateFood)

//delete food by id
router.delete('/deletete/:id', authMiddleware, deleteFood)

module.exports = router