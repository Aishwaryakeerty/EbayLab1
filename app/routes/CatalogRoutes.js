var express = require('express');

var routes = function (conn) {
    var catalogRouter = express.Router();
    var catalogController = require('../controllers/catalogController.js')(conn);

    // Fetch brand and category list
    catalogRouter.route('/')
        .get(catalogController.get);


    // Fetch products from current category
    catalogRouter.use('/:catName', function (req, res, next) {
      console.log("select * from products where brand = '"+req.params.catName+"'")
      conn.query("select * from products where brand = '"+req.params.catName+"'",function(err,rows,fields){
        if (err) {
            res.status(500).send(err);
        } else if(rows.length>0) {
            req.categories = rows;
            next();
        } else {
          console.log(rows)
            res.status(404).send('Products not found');
        }
      })
    });

    catalogRouter.route('/:catName')
        .get(catalogController.getProducts);

    return catalogRouter;
};

module.exports = routes;
