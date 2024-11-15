const categoryModel = require("../models/categoryModel")

//create category
const createCategory = async (req, res) => {

    try {
        const {title,imageUrl} = req.body

        //field validation
        if(!title|| !imageUrl){
           return res.status(500).send({
        status : false,
        message: 'all fields must be filled',

            })
        }

const newCategory = await new categoryModel({
    title,
     imageUrl,
})

await newCategory.save()

    return res.status(201).send({
        success : true,
        message: 'category created successfully',
        newCategory
    })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in create category Api",
            error
        })
    }

}


// get all categories

const getAllCategories = async (req, res) => {

try {
   
    const categories = await categoryModel.find()
    if(!categories){
return res.status(404).send({
    success : false,
    message : 'no category found'
})
    }
return res.status(200).send({
    success : true,
    totalCategory : categories.length,
    categories
})

} catch (error) {
    console.log(error)
        res.status(500).send({
            success:false,
            message:"error in getAll category Api",
            error
        })
}
}


//update a category

const updateCategory = async (req, res) => {

    try {
        const {id} = req.params
        if(!updatedCategory){
            return res.status(500).send({
                success : false,
                message : 'category id not found'
            })
        }
        const {title, imageUrl} = req.body
        const updatedCategory = await categoryModel.findByIdAndUpdate(id,{title, imageUrl}, {new:true})
        if(!updatedCategory){
            return res.status(500).send({
                success : false,
                message : 'cannot update category'
            })
        }
return res.status(200).send({
    success : true,
    message : 'category updated successfully ',
    updatedCategory
})
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in update category Api",
            error
        })
    }
}


//delete category

const deleteCategory = async () => {

try {
    
const {id} = req.params
if(!id){
    return res.status(500).send({
        success : false,
        message : 'category id not found'
    })
}
const category = await categoryModel.findById(id)
if(!category){
    return res.status(500).send({
        success : false,
        message : 'cannot delete category                                               '
    })
}

await categoryModel.findByIdAndDelete(id)
return res.status(200).send({
    success : true,
    message : 'category deleted successfully'
})

} catch (error) {
    console.log(error)
        res.status(500).send({
            success:false,
            message:"error in delete category Api",
            error
        })
}
}




module.exports = {
createCategory,
getAllCategories,
updateCategory,
deleteCategory

}