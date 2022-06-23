const express = require('express');
const {
    httpTest,
    httpLogin,
    httpRegisterUser
} =require('./user.controller')

const userRoute = express.Router();

userRoute.get('/', httpTest);

userRoute.post('/login', httpLogin);
userRoute.post('/register', httpRegisterUser);


module.exports = userRoute

