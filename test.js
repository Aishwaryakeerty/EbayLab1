var MongoClient = require("mongodb").MongoClient
var mysql = require("mysql");

var url = "mongodb://root:123456@ds043952.mongolab.com:43952/shop";
var connection = mysql.createConnection({
  host     : "localhost",
  user     : "root",
  password : "root",
  database : "meanshop"
});

connection.connect();
MongoClient.connect(url, function(err, db) {
  console.log("Connected correctly to server");
  var collection = db.collection("products");
  // Find some documents
  collection.find({},function(err, docs) {
      docs.forEach(function(d){
        //console.log(d.description);exit;
        var images = d.images.join('|');
        var description =d.description.join('|');
console.log("insert into products(sku,title,description,brand,type,pricing,images,seo,details) VALUES('"+d.sku+"','"+d.title+"','"+description+"','"+d.brand+"','"+d.type+"',"+d.pricing+",'"+images+"',"+d.seo+","+d.details+")");exit;
        connection.query("insert into products(sku,title,description,brand,type,pricing,images,seo,details) VALUES('"+d.sku+"','"+d.title+"','"+description+"','"+d.brand+"','"+d.type+"',"+d.pricing+",'"+images+"',"+d.seo+","+d.details+")", function(err, rows, fields) {
            if (err) throw err;


            });
      })
  });
  db.close();
});
