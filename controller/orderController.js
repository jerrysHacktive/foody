const orderModel = require('../models/orderModel')

//PLACE ORDER
const placeOrder = async(req, res) => {

    try {
        
const {cart} = req.body
if(!cart){
   return res.status(500).send({
        success:false,
        message:"provide food cart or payment method",
    
    })
}

let totalCart = 0

//cart calculation
cart.map((i)=>{
    totalCart += i.price
})

const newOrder = await new orderModel({
    foods:cart,
    payment: totalCart,
    buyer:req.body.id
})

await newOrder.save()
return res.status(201).send({
    success : true,
    message:"order placed successfully",
    newOrder
})

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in placeOrder Api",
            error
        })  
    }
}


//CHANGE ORDER STATUS
const orderStatus = async (req, res) => {

    try {
        
const orderId = req.params.id
if(!orderId){
    return res.status(500).send({
        success:false,
        message:'provide order id'
    })  
}

const {status} = req.body

const updatedOrderStatus = await orderModel.findByIdAndUpdate(orderId, {status}, {new:true})

return res.status(200).send({
    success : true,
    message : 'order status updated',
    updatedOrderStatus
})


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in orderStatus Api",
            error
        })  
    }




}



module.exports = {
    placeOrder,
    orderStatus
}