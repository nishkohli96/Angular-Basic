
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app     = express();
var mongo = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var fs= require('fs');
var result=[];

//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
     res.setHeader('Access-Control-Allow-Credentials', true);
     next();
 });

app.post('/saveUser', function(req, res) {
  mongo.connect(url, function(err, db) {
  if (err)
  {
    console.log("save user connection error");
    throw err;
  }
   var dbo = db.db("userDB");

   dbo.createCollection("User", function(err, res) {
   if (err) {
     console.log("collection not created");
     throw err;
   }
   console.log("Collection created!");

   var myobj ={"name":req.body.name,"email":req.body.email,"address":req.body.address,"phone":req.body.phone};
    dbo.collection("User").insertOne(myobj, function(err, res) {
    if (err) {
      console.log("data  not inserted");
      throw err;
    }
    console.log("1 document inserted");
    db.close();
   });
  });
 });
});


mongo.connect(url,result,function(err, db) {
  var dbo = db.db("userDB");
  var cursor = dbo.collection('User').find();

  var i=0;
  cursor.forEach(function(item) {
           if (item != null) {
                    console.log("extracting data");
                    var record = {"name":item.name,"emails":item.email,"phone":item.phone,"address":item.address};
                    console.log(record);
                    result.push(record);
          }
        });
 db.close();
  });


app.get('/getUser', function(req, res) {
  mongo.connect(url,result);

/*
  mongo.connect(url,result,function(err, db) {
  var dbo = db.db("userDB");
  var cursor = dbo.collection('newUser').find();

  var i=0;
  cursor.forEach(function(item) {
           if (item != null) {
                    console.log("extracting data");
                    var record = {"name":item.name,"emails":item.email,"phone":item.phone,"address":item.address};
                    //console.log(record);
                    result.push(record);

               //    console.log(result);
          }
        });


      //    res.send(str);
      //    res.end()
 db.close();
  });
*/
  console.log("getting rsult");
  console.log(result);
  res.json(result);
});

app.post('/updateUser', function(req, res) {
  mongo.connect(url, function(err, db) {
  if (err)
  {
    console.log("save user connection error");
    throw err;
  }
   var dbo = db.db("userDB");
   var update_key={"email":req.body.email};
   var new_obj ={$set:{"name":req.body.name,"address":req.body.address,"phone":req.body.phone}};
    dbo.collection("User").updateOne(update_key,new_obj, function(err, res) {
    if (err) {
      console.log("data  not updated");
      throw err;
    }
    console.log("Data successfully updated");
    db.close();
   });
  });
 });

 app.post('/deleteUser', function(req, res) {
   mongo.connect(url, function(err, db) {
   if (err)
   {
     console.log("save user connection error");
     throw err;
   }
    var dbo = db.db("userDB");
    var delete_key={"email":req.body.email};
     console.log(delete_key);
     dbo.collection("User").deleteOne(delete_key, function(err, res) {
     if (err) {
       console.log("entry not deleted");
       throw err;
     } else
     console.log("Record deleted");
     db.close();
    });
   });
   mongo.connect(url,result);
  });



function getData(){
    let self = this;
    try{
        mongo.connect(url, function(err, db) {
          //  assert.equal(null, err);
            let userList = []
            let cursor = db.collection('userDB').find();

            cursor.each(function(err, doc) {
            //  assert.equal(err, null);
              if (doc != null) {
                userList.push(doc)
              } else {
                return self.res.status(200).json({
                    status: 'success',
                    data: userList
                })
              }
            });
        });
    }
    catch(error){
        return self.res.status(500).json({
            status: 'error',
            error: error
        })
    }
}



app.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080/');
});
