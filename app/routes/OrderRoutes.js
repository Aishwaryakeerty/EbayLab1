var express = require('express');

var routes = function (conn) {
    var ordersRouter = express.Router();
    var orderController = require('../controllers/orderController.js')(conn);
    var token = require('../controllers/tokenController')();

    // Add new Order
    ordersRouter.use('/new-order', function (req, res, next) {
        // Geterate order id
      conn.query("select count(*)as count from orders",function(err,rows,fields){
        req.count = rows[0].count;
          next();
      });
        
          
   

    });

    ordersRouter.route('/new-order')
        .post(orderController.post);

    // Fetch single order
    ordersRouter.use('/:orderHash', function (req, res, next) {
      conn.query("select * from orders where urlHash='"+req.params.orderHash+"'",function(err,rows,fields){
        if (err){
          
            res.status(500).send(err);
        } else if(rows.length>0) {
            rows[0].customerInfo = JSON.parse(JSON.stringify(rows[0].customerInfo));
            rows[0].orderInfo = JSON.parse(JSON.stringify(rows[0].orderInfo));
            rows[0].products = JSON.parse(JSON.stringify(rows[0].products));
          req.order = rows;
            next();
        } else {
            res.status(404).send('Order not found');
        }
      })
        
    });

    ordersRouter.route('/:orderHash')
        .get(orderController.getOne);

    ordersRouter.use('/', function (req, res, next) {
        token.verifyToken(req, res, next);
    });

    ordersRouter.route('/')
        .get(orderController.get);

    return ordersRouter;
};

module.exports = routes;
