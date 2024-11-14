const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({

title:{
    type: String,
    required:[true, "category title is required"]
},

imageUrl:{
    type:String,
    default : ''
},

}, {timestamps:true})

//export 
module.exports = mongoose.model('category',categorySchema)