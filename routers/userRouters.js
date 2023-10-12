const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/authJWT');

// sign in and sign up
userRouter.post('/api/signin', userController.signin);
userRouter.post('/api/signup', userController.signup);

// get portfolio
userRouter.post('/api/portfolio/get', userController.getPortfolio);

// add & delete to portfolio
userRouter.post('/api/portfolio/append', userController.appendToPortfolio);
userRouter.post('/api/portfolio/delete', userController.deleteFromPortfolio);

module.exports = userRouter;