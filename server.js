'use strict'
const express = require('express')
const colors = require('colors')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')

//dot env configuration
dotenv.config()

//require the database configuration
 //require('./config/dbConfig')

//rest object
const app = express()

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/v1/auth', require('./routes/authRoutes'))
app.use('/api/v1/users', require('./routes/userRoute'))
app.use('/api/v1/restaurants', require('./routes/restaurantRoute'))
app.use('/api/v1/category', require('./routes/categoryRoutes'))
app.use('/api/v1/foods', require('./routes/foodRoutes'))
app.use('/api/v1/orders', require('./routes/orderRoutes'))

app.get('/', (req, res)=>{
res.status(200).send('<h1>welcome to foody-App server</h1>')
})

//PORT
const PORT = process.env.PORT

//listen to the port
app.listen(PORT, ()=>{
console.log("server running on port :"+ PORT)
})


