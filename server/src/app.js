var cors = require("cors");
const express = require('express');
const userRoute = require('./routes/user.router')
const  cookieParser  = require('cookie-parser');


const app = express();

app.use(express.json());

//Body Parser Middleware
app.use(cookieParser())

//CORS Middleware
app.use(cors({
    credentials: true,
    origin: ['http://localhost:4200']
}));

// Authentication Route
app.use('/auth',userRoute );


module.exports = app; 