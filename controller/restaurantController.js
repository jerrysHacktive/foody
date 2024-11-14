'use strict'
const restaurantModel = require('../models/restaurantModel')


//CREATE RESTAURANT
const createRestaurant = async(req, res)=>{

    try {
        const {
            
            title,
             imageUrl,
              foods, 
              time, 
              pickup,
               delivery,
                isOpen, 
                logoUrl, 
                rating, 
                ratingCount,
                 code,
                  coords
                } = req.body


        //field validation
        
        if(!title|| !imageUrl || !foods|| !time ||!pickup ||!delivery ||!isOpen ||!logoUrl ||!rating ||!ratingCount ||!code |!coords){
           return res.status(500).send({
        status : false,
        message: 'all fileds must be filled',

            })
        }
const newRestaurant = await new restaurantModel({
    title,
     imageUrl,
      foods, 
      time,
       pickup,
        delivery, 
        isOpen, 
        logoUrl, 
        rating,
         ratingCount, 
         code, 
         coords
})

await newRestaurant.save()

    return res.status(201).send({
        success : true,
        message: 'restaurant created successfully',
        newRestaurant
    })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in create restaurant Api",
            error
        })
    }

}

//GET ALL RESTAURANTS

const getAllRestaurants = async (req, res)=>{
try {
    const restaurants = await restaurantModel.find()
    if(!restaurants){
       return res.status(500).send({
            success:false,
            message:"no restaurant available",
        })
    }
return res.status(200).send({
    success: true,
    totalCount: restaurants.length,
    restaurants
})
    
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"error in getAll restaurant Api",
        error
    })
}

}


//GET A SINGLE RESTAURANT BY ID

const getRestaurant = async (req, res) => {

try {
    
    // check the id 
    const restaurantId = req.params.id
    if(!restaurantId){
        return res.status(404).send({
    success : false,
    message: 'provide restaurant id'
})
    }
//check if the restaurant exists
const restaurant = await restaurantModel.findById(restaurantId)
if(!restaurant){
    return res.status(404).send({
success : false,
message : 'no restaurant found'
    })
}
    return res.status(200).send({
        success : true,
        message : 'restaurant found',
        restaurant
    })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"error in get a restaurant Api",
        error
    })
}
}


//DELETE RESTAURANT

const deleteRestaurant = async (req, res) => {

    try {

      //check if the restaurant exists
    const restaurantId = req.params.id
    if(!restaurantId){
        return res.status(404).send({
    success : false,
    message: 'provide restaurant id, no restaurant found'
})
    }
await restaurantModel.findByIdDelete(restaurantId)
    return res.status(404).send({
success : true,
message : 'restaurant deleted successfully'
    })  

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in delete restaurant Api",
            error
        })
    }

}







module.exports = {createRestaurant, getAllRestaurants, getRestaurant, deleteRestaurant}