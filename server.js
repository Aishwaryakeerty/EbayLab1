var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    config = require('./app/config/config'),
    multer  = require('multer'),
    morgan = require('morgan'),
    Pool = require('generic-pool').Pool,
    mysql = require('mysql');


var pool = new Pool({
    name     : 'mysql',
    create   : function(callback) {
        var c = mysql.createConnection({
                user: 'root',
                password: 'root',
                database:'meanshop'
        })

        // parameter order: err, resource
        callback(null, c);
    },
    destroy  : function(client) { client.end(); },
    max      : 100,
    // optional. if you set this, make sure to drain() (see step 3)
    min      : 2,
    // specifies how long a resource can stay idle in pool before being removed
    idleTimeoutMillis : 30000,
     // if true, logs via console.log - can also be a function
    log : true
});
var connection;
pool.acquire(function(err, client) {
    if (err) {
        // handle error - this is generally the err from your
        // factory.create function
    }
    else {
        connection  = client;
    }
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));


// Product Api
var productRouter = require('./app/routes/ProductRoutes')(connection);
app.use('/api/products', productRouter);

// Catalog Api
var catalogRouter = require('./app/routes/CatalogRoutes.js')(connection);
app.use('/api/catalog', catalogRouter);

// Orders Api
var ordersRouter = require('./app/routes/OrderRoutes')(connection);
app.use('/api/orders', ordersRouter);

//User Api
var userRouter = require('./app/routes/UserRouters')(connection);
app.use('/api/user', userRouter);

// Front end url
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(config.PORT, function () {
    console.log('App is running on port: ' + config.PORT);
});
