const express = require('express');
const {
    httpTest,
    httpLogin,
    httpRegisterUser,
    httpUserProfile,
    httLogout
} =require('./user.controller')

const checkAuth = require('../middleware/JWT')


const userRoute = express.Router();

// userRoute.get('/test',  httpTest);

userRoute.post('/login', httpLogin);
userRoute.post('/register', httpRegisterUser);

userRoute.get('/userProfile', checkAuth.validateToken ,httpUserProfile);

userRoute.post('/logout', httLogout);


module.exports = userRoute

