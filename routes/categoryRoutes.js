const express = require('express')

//router objects
const router = express.Router()

const {createCategory, getAllCategories, updateCategory, deleteCategory} = require('../controller/categoryController')
const authMiddleware = require('../middleware/authMiddleware')

// routes 

//create category route 
router.post('/create', authMiddleware, createCategory)

//get all categories
router.get('/getAll', getAllCategories)

//update a acetgory
router.put('/update/:id', authMiddleware, updateCategory)

//delete a category
router.delete('/delete/:id', authMiddleware, deleteCategory)

//export routes
module.exports = router