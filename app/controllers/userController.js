
bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';


function sendResponse(res, success, message){
    return res.json({
        success: success,
        message: message
    });
}

var userController = function (conn) {

    var signUp = function (req, res) {
        var user = [];
        user[0] = req.body.name;
        user[1] = req.body.email;
        user[2] = req.body.mobile;
        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
             if(err)console.log(err);
             conn.query("insert into users(name,email,mobile,password,is_active) VALUES ('"+user[0]+"','"+user[1]+"','"+user[2]+"','"+hash+"','true')",function(err,data){
                    if(err)console.log(err);
                    res.json({
                        success:true
                    });
             })
        });

    };
   var get_orders = function (req, res) {
       var user_id = req.body.account_id;
        console.log("select orders.*,users.name,users.mobile from orders join users on users.id="+user_id+" AND users.email = orders.email")
             conn.query("select orders.*,users.name,users.mobile from orders join users on users.id="+user_id+" AND users.email = orders.email" ,function(err,rows,field){
                    if(err)console.log(err);
            
                    res.json(rows);
        });

    };

    var getAllUsers = function (req,res) {
        conn.query("select * from users",function(err, rows, fields){
              if(err)console.log(err);
              if(rows.length>0){
                res.json(rows);
              }
        });
    };

    var userAuth =function (req, res) {
        conn.query("select * from users where email='"+req.body.email+"'",function(err, rows, fields){
              if(err)console.log(err);
              if(rows.length>0){
                    var token = require('../controllers/tokenController')(rows[0].email);
                    bcrypt.compare(req.body.password, rows[0].password, function(err, result) {
                            if(result){
                              res.json({
                                  success: true,
                                  message: 'Enjoy your token!',
                                  account_id : rows[0].id,
                                  token: token.createToken(rows[0])
                              });
                            }else{
                                sendResponse(res, false, 'Authentication failed. Wrong password.');
                            }
                    });
              }else{
                sendResponse(res, false, 'User does\'not exist!');
              }
        })

    };

    return {
        signUp: signUp,
        getUsers: getAllUsers,
        authentication: userAuth,
        get_orders : get_orders
    };
};

module.exports = userController;
