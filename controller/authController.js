'use strict'

const userModel = require('../models/userModel')
const bcrypt = require('bycryptjs')
const jwt = require('jsonwebtoken')


//function to register a new user
const registerController  = async (req, res)=>{
try {
    const {userName, email, password, phone, address,answer} = req.body
    
    //validating the user input
    if(!userName| !email |!password |!phone |!address |!answer) {
       return res.status(500).send({
            success: false,
            message:"please provide all fields"
        })
    }

// check if user already exist
const existingUser = await userModel.findOne({email})
if(existingUser)

return res.status(500).send({
    success: false,
    message: "email is already registered, please login"
})

//hashing the user password
const salt = bcrypt.genSaltSync(10)
const hashedPassword = await bcrypt.hash(password, salt)

//create new user
const user = await new userModel.create({
    userName,
     email,
     password:hashedPassword, 
     phone,
      address,
      answer,
    })

res.status(201).send({
success: true,
message: "successfully registered",
user
})

} catch (error) {
    console.log(error)
    res.status(500).send({
        success: false,
        message: "error in registering",
        error
    })
}
}


//function to sign up a new user

const loginController = async (req, res)=>{

try {
    const {email, password} = req.body

    //validating user input
    if(!email | !password){
    res.status(500).send({
        success: false,
        message: "please provide email or password"
    })
    }

//check if the user exist
const user = await userModel.findOne({email: email, password:o})
if(!email){
return res.status(404).send({
success:false,
message:"user not found! or password mismatch!"
})
}

//check user password | compare password

const passwordMatch = await bcrypt.compare(password, user.password)
if(!passwordMatch){
    return res.status(500).send({
        success:false,
        message:"invalid credentials"
    })
}

//token(ro create a private and protected route/conifential pages not visible to others)

const token = jwt.sign({id: user._id}, process.env.JWT_SECRET,{
    expiresIn: '1d'
})



user.password = undefined
res.status(200).send({
    success: true,
    message:"login successful",
    token,
    user,

})

} catch (error) {
    console.log(error)
    res.status(500).send({
        success: false,
        message: "error logging in",
        error
    })
}
    
}


















module.exports = {registerController, loginController}