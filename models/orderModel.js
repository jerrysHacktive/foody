const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({

foods:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"foods"
    }
],

payment:{},

buyer:{
    type:mongoose.Schema.Types.ObjectId,
        ref:"user"
},

status:{
    type: String,
    enum:["preparing", "prepared", "on the way", "delivered"],
    default:"preparing"
}



}, {timestamps:true})

//export 
module.exports = mongoose.model('order',orderSchema)