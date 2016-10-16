var express = require('express');

var routes = function (conn) {
    var userRouter = express.Router();
    var userController = require('../controllers/userController')(conn);
    var token = require('../controllers/tokenController')();

    userRouter.route('/sign-up')
        .post(userController.signUp);

    userRouter.route('/login')
        .post(userController.authentication);
  
   userRouter.route('/history').post(userController.get_orders);

    // Fetch users
    userRouter.use('/', function (req, res, next) {
        token.verifyToken(req, res, next);
    });

    userRouter.route('/')
        .get(userController.getUsers);

    return userRouter;
};

module.exports = routes;
