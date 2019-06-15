var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var http1 = require("http");
var qs = require("querystring");
var Promise = require('promise');
var http = require("https");

app.use(bodyParser.json());

app.listen(8080, function(req,res) {
  console.log('Server running at http://127.0.0.1:8080/');

  var options = {
    "method": "POST",
    "hostname": "control.msg91.com",
    "port": null,
    "path": "api/sendotp.php?otp_length=6&authkey=276004AN70bRMMgI5cd51be7&mobile=917975751097&otp_expiry=3&sender=NISHHD&message=##OTP##",
    "headers": {}
  };
/*
  var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  });

  req.end();
*/
app.post("https://control.msg91.com/api/sendotp.php?otp_length=6&otp_expiry=3&sender=NISHHD&message=##OTP##&mobile=919814110843&authkey=276004AN70bRMMgI5cd51be7",
function(req,res){
console.log("done");
});
});
