const express = require('express');
const { userRegister, userLogin, getAllUsers } = require('../controllers/userController');
const Auth = require('../middlewares/authMiddleware');

const userRouter = express.Router();

userRouter.get('/all', Auth(['admin', 'user']),getAllUsers)

userRouter.post('/register', userRegister)

userRouter.post('/login', userLogin)



module.exports = userRouter;