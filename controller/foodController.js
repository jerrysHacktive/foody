const foodModel = require("../models/foodModel")
const orderModel = require("../models/orderModel")
const createFood = async (req, res) => {

try {
    const {title, description , price,foodTags, category, imageUrl, isAvailable, restaurant, rating, ratingCount, code} = req.body
if(!title || !description ||!price ||!restaurant){
       return res.status(500).send({
            success:false,
            message:"provide all fields",
        })
}

const newFood = await new foodModel({
    title, description , price,foodTags, category, imageUrl, isAvailable, restaurant, rating, ratingCount, code
})

await newFood.save()
return res.status(201).send({
    success:true,
    message:"new food item created successfuly",
    newFood
})

} catch (error) {
    console.log(error)
        res.status(500).send({
            success:false,
            message:"error in createfood Api",
            error
        })
}
}


// get all food items
const getAllFoods = async (req, res) => {

    try {
        const foods = await foodModel.find()
if(!foods){
       return res.status(500).send({
            success:false,
            message:"food items not found",
        
        })
}
        return res.status(200).send({
            success:true,
            totalFoodItems : foods.length,
            foods
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in getAllfoods Api",
            error
        })
    }
}


// get a single food item

const getSingleFood = async (req, res)=> {

    try {

const foodId = req.params.id
if(!foodId){
    return res.status(404).send({
        success:false,
        message:"food Id not found, provide food Id"
    })
  
}
const food = await foodModel.findById(foodId)
if(!food){
    return res.status(404).send({
        success:false,
        message:"food item not found"
    })
  
}

return res.status(200).send({
    success:true,
    message:"food item found ",
    food
})

        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in getSinglefood Api",
            error
        })
    }


}

// to get food by restaurant
const getFoodByRestaurant = async (req, res) => {

    try {

        const restaurantId = req.params.id
        if(!restaurantId){
            return res.status(404).send({
                success:false,
                message:"restaurant Id not found, provide restaurant Id"
            })
          
        }
        const food = await foodModel.find({restaurant : restaurantId})
        if(!food){
            return res.status(404).send({
                success:false,
                message:"restaurant  not found"
            })
          
        }
        
        return res.status(200).send({
            success:true,
            message:"food by restaurant ",
            food
        })
        
                
            } catch (error) {
                console.log(error)
                res.status(500).send({
                    success:false,
                    message:"error in getFoodByRestaurant Api",
                    error
                })
            }
}


//  Update food function
const updateFood = async (req, res) => {

try {

    const foodId = req.params.id
    if(!foodId){
        return res.status(404).send({
            success: false,
            message:"no food Id was found"
        })
    }
    const food = await foodModel.findById(foodId)
    if(!food){
        return res.status(404).send({
            success: false,
            message:"no food  was found"
        })
    }

    const {title, description , price,foodTags, category, imageUrl, isAvailable, restaurant, rating, ratingCount, code} = req.body

    const updatedFood = await foodModel.findByIdAndUpdate(foodId, {title, description , price,foodTags, category, imageUrl, isAvailable, restaurant, rating, ratingCount, code}, {new:true})

    return res.status(200).send({
        success:true,
        message:"food item updated successfully",
        updatedFood
    })
    
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"error in updateFood Api",
        error
    })
}
}

// delete the food by id
const deleteFood = async (req, res) => {

try {
    const foodId = req.params.id
    if(!foodId){
        return res.status(404).send({
            success: false,
            message:"no food Id was found"
        })
    }
    const food = await foodModel.findById(foodId)
    if(!food){
        return res.status(404).send({
            success: false,
            message:"no food  was found"
        })
    }

    await foodModel.findByIdAndDelete(foodId)

        return res.status(200).send({
            success: true,
            message:"food item deleted successfully"
        })
    
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"error in deleteFood Api",
        error
    })
} 
}


module.exports = {
    createFood,
    getAllFoods,
    getSingleFood,
    getFoodByRestaurant,
    updateFood,
    deleteFood
}