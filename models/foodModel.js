const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({

title:{
    type: String,
    require:[true, "food title is required"]
},

description : {
    type : String,
    require : [true, 'description is required']
},

price : {
    type : Number,
    require : [true, 'food price is required']
},

foodTags : {
    type : String,
},

category : {
    type : String
},

imageUrl:{
    type:String,
    default : ''
},

isAvailable:{
    type: Boolean,
    default : true
},

restaurant : {
type : mongoose.Schema.Types.ObjectId,
ref : 'restaurant',


},
rating:{
    type: Number,
    default: 5,
    min:1,
    max:5
},
ratingCount:{
    type:String
},

code:{
    type: String
}


}, {timestamps:true})

//export 
module.exports = mongoose.model('foods', foodSchema)