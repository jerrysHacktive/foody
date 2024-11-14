'use strict'
const express = require("express")
const router = express.Router()
const {
    createRestaurant,
    getAllRestaurants,
    getRestaurant,
    deleteRestaurant
} = require("../controller/restaurantController")

const authMiddleware = require("../middleware/authMiddleware")

//ROUTES
//CREATE RESTAURANT || POST METHOD
router.post('/create', authMiddleware, createRestaurant)

//GETALL RESTAURANT || GET METHOD
router.get('/getAll', getAllRestaurants)

//GET A SINGLE RESTAURANT BY ID
router.get('/get/:id', getRestaurant)

//DELETE A RESTAURANT || DELETE METHOD
router.delete('/delete/:id', authMiddleware, deleteRestaurant )


module.exports = router