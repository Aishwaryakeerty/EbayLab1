var express = require('express');

var routes = function (conn) {
    var productRouter = express.Router();
    var productsController = require('../controllers/productsController')(conn);
    var token = require('../controllers/tokenController')();

    // Add product
    // productRouter.use('/addproduct', function (req, res, next) {
    //     token.verifyToken(req, res, next);
    // });

    productRouter.route('/addproduct')
        .post(productsController.post);
  
    productRouter.route('/search')
        .post(productsController.search);


    // Fetch product
    productRouter.use('/:productId', function (req, res, next) {
       conn.query("select * from products where sku= '"+req.params.productId+"'",function(err,rows,fields){
          if(err)res.status(500).send(err);
          else if(rows.length>0){
            req.product = rows;
            next();
          }else{
              res.status(404).send('Product not found');
          }
       })
    });

    productRouter.route('/:productId')
        .get(productsController.getOne);

    productRouter.route('/')
        .get(productsController.get);

    return productRouter;
};

module.exports = routes;
