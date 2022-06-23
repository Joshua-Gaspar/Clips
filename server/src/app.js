const express = require('express');

const userRoute = require('./routes/user.router')
const app = express();

app.use(express.json());

app.use('/auth',userRoute );


module.exports = app; 