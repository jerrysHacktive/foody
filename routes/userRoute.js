'use strict'
const express = require("express")
const router = express.Router()
const {
    getUser,
    updateUser,
    updateUserPassword,
    resetPassword ,
    deleteUser
} = require("../controller/userController")

const authMiddleware = require("../middleware/authMiddleware")

//ROUTES
//GET USER PROFILE || GET METHOD
router.get('/getUser/:id', authMiddleware, getUser)

//UPDATE USER PROFILE || PUT METHOD
router.put('/updateUser/:id',authMiddleware, updateUser)

//PASSWORD UPDATE || POST METHOD
router.post('/updatePassword', authMiddleware, updateUserPassword)

//RESET PASSWORD || POST METHOD
router.post('/resetPassword', authMiddleware, resetPassword)

//DELETE USER || DELETE METHOD
router.delete('/deleteUser/:id',authMiddleware, deleteUser)



module.exports = router