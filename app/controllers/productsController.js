var _ = require('underscore');

var productsController = function (conn) {

    // Post new product function
    var post = function (req, res) {
        // Get images path
        
        // if(req.files){
        //     if(req.files.images === undefined) {
        //         urlArray = [];
        //     }
        //     else if(!Array.isArray(req.files.images)){
        //         urlArray.push(req.files.images.path.slice(7));
        //     } else{
        //         urlArray = _.map(req.files.images, function(num){
        //            return num.path.slice(7);
        //        });
        //     }
        // }

        req.body.price = req.body.price;
         
        images = "http://hbz.h-cdn.co/assets/cm/15/05/980x490/54bbcbc11dd59_-_hbz-gap-teeth-chic-april-2014-lara-stone-xl.jpg";
        
        conn.query("insert into products(title,description,brand,type,pricing,images) VALUES('"+req.body.title+"','"+req.body.description+"','"+req.body.brand+"','"+req.body.type+"','"+req.body.price+"','"+ images+"')",function(err,data){
              if(err)console.log(err);
              else{
                res.status(200);
                res.json({
                    success: true,
                    product: data
                });
              }
        });

    };

    // Get all products function
    var get = function (req, res) {
      conn.query("select * from products",function(err,rows,fields){
          if(err) {
              res.send(err);
              return;
          }
          res.json(rows);
          res.status(200);
      })

    };
    // Get all search products function
    var search = function (req, res) {
      conn.query("select * from products where title like '%"+req.body.search+"%'",function(err,rows,fields){
          if(err) {
              res.send(err);
              return;
          }
          res.json(rows);
          res.status(200);
      })

    };

    var getOne = function (req, res) {
        res.json(req.product);
    };

    return {
        post: post,
        get: get,
        getOne: getOne,
        search :search
    };

};

module.exports = productsController;
