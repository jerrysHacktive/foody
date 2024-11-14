'use strict'
const express = require("express")

const router = express.Router()

const {registerController, loginController} = require("../controller/authController")
//ROUTES

//REGISTER|POST METHOD
router.post('/register',registerController )

//LOGIN|POST
router.post('/login', loginController)



module.exports = router