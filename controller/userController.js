'use strict'
const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')

//GET USER INFO
const getUser = async (req, res)=>{

    try {
        //find user
const user = await userModel.findById({_id:req.body.id})

//validating if hes a user
if(!user){
    return res.status(404).send({
        success:false,
        message:"user not found"
    })
}
//hide the password
user.password = undefined

//success response
res.status(200).send({
    status:true,
    message:"user get successfully",
    user
})

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error getting user Api",
            error
        })
    }
}


//UPDATE USER PROFILE

const updateUser = async (req, res)=>{

    try {

//find the user
const user = await userModel.findById({_id: req.body.id})

//validating if a user exist
if(!user){
    return res.status(404).json({
        success:false,
        message:"user not found"
    })
}

//update the user
const {userName, address, phone} = req.body
if(userName) user.userName = userName
if(address) user.address = address
if(phone) user.phone = phone

//save the user
await user.save();
res.status(200).send({
    success:true,
    message:"user updated successfully",
    user
})
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error updating user Api",
           error
    })
}
}


//UPDATE USER PASSWORD
const updateUserPassword = async(req, res)=>{

try {

    //get the user by id
    const user = await userModel.findById({_id:req.body.id})

    //validate if user exists
    if(!user){
        return res.status(404).send({
            success:false,
            message:"user not found"
        })
    }

    // get data from user
    const {oldPassword, newPassword} = req.body
    if(!oldPassword | !newPassword){
        return res.status(500).send({
            success:false,
            message:"please provide old or new password"
        })
    }

    //check users password | compare password
    const passwordMatch = await bcrypt.compare(oldPassword, user.password)
if(!passwordMatch){
    return res.status(500).send({
        success:false,
        message:"invalid old password"
    })
}

//hashing the user password
const salt = bcrypt.genSaltSync(10)
const hashedPassword = await bcrypt.hash(newPassword, salt)
user.Password = hashedPassword

await user.save()

res.status(200).send({
    success: true,
    message:"users password updated successfully"
})
} catch (error) {
    console.log(error)
        res.status(500).send({
            success:false,
            message:"error updating user password Api",
            error
           
    })
}
}



//RESET PASSWORD FUNCTION
const resetPassword = async (req, res)=>{
try {

const {email, newPassword, answer} = req.body

//validating user field
if(!email |!newPassword |!answer){
    return res.status(500).send({
        success : true,
        message:"please provide all fields"
    })
}

const user = await userModel.findOne({email, answer})
if(!user){
    return res.status(500).send({
        success : false,
        message:"user not found or invalid answer"
    })
}

//hashing the user password
const salt = bcrypt.genSaltSync(10)
const hashedPassword = await bcrypt.hash(newPassword, salt)
user.passsword = hashedPassword

await user.save()

res.status(200).send({
    success: true,
    message:"users password reset successfully"
}) 
} catch (error) {
    console.log(error)
        res.status(500).send({
            success:false,
            message:"error resetting user password Api",
            error
           
    })
}
}


//DELETE USER PROFILE /ACCOUNT FUNCTIONALITY
const deleteUser = async(req, res)=>{

    try {
       await user.findByIdAndDelete(req.parama.id) 
       return res.status(200).send({
        success : true,
        message:"your account has been deleted"
       })



    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error deleting user profile Api",
            error
        })
    }




}





module.exports = {
    getUser,
     updateUser,
      updateUserPassword,
       resetPassword,
       deleteUser
    }