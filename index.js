const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
var colors = require('colors');
const {errorHandler} = require('./middleware/errorMiddleware.js');
const cookieParser =require('cookie-parser')
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000
const app =express()
app.use(cors({
  origin: "http://localhost:3000"
}));
const connectDB = require('./config/db')

connectDB("clinic")
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/reviews', require('./routes/reviewsRoutes'))
app.use('/user', require('./routes/authRoutes'))
app.use(errorHandler);


app.listen(
    PORT,
    console.log(
      `Server Running in ${process.env.NODE_ENV} mode on Port ${PORT}`.blue.bold
    )
  );


  