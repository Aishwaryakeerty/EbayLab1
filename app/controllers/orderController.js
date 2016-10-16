var sendMail = require('../controllers/mailerController');
var orderController = function (conn) {

    // Post new order function
    var post = function (req, res) {

        
           var email =req.body.email;
            var customerInfo={
                name: req.body.name,
                username: req.body.username,
                phone: req.body.phone,
                email: req.body.email,
                address: req.body.address
            };
            var orderInfo= {
                date: new Date(),
                id: req.count,
                status: 'New',
                sum: req.body.sum,
                discount: req.body.discount,
                delivery: {
                    method: req.body.deliveryMethod,
                    cost: req.body.cost
                },
               
                payment:{
                    method: req.body.paymentMethod,
                    isPaid: false
                }
            }
            var amount = req.body.sum;
            var products=req.body.products;
           var urlHash=req.body.hash;
        
     //onsole.log("insert into orders(customerInfo,orderInfo,products,urlHash,email) VALUES("+order.customerInfo+","+order.orderInfo+","+order.products+","+order.urlHash+","+oremail+")");
      conn.query("insert into orders(customerInfo,orderInfo,products,urlHash,email,amount) VALUES('"+customerInfo+"','"+orderInfo+"','"+products+"','"+urlHash+"','"+email+"',"+amount+")",function(err,rows,fields){
              if(err){
                console.log(err);
                  throw err;
              } else{
                  console.log('Order has been created.');
              }

              res.json({
                  success: true,
                  order: rows
              });

              sendMail(req);
      })

    };

    // Get all orders function
    var get = function (req, res) {
      conn.query("select * from orders",function(err,rows,fields){
        if(err){
            throw err;
        }
        res.json(rows);
      })
      
    };

    var getOne = function (req, res) {
        res.json(req.order);
    };

    return {
        post: post,
        get: get,
        getOne: getOne
    };
};

module.exports = orderController;
